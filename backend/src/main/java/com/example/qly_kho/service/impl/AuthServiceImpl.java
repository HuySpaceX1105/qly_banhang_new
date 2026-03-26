package com.example.qly_kho.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.qly_kho.constant.ActionConstants;
import com.example.qly_kho.constant.AppConstants;
import com.example.qly_kho.dto.request.LoginRequest;
import com.example.qly_kho.dto.response.AuthResponse;
import com.example.qly_kho.dto.response.AuthUserResponse;
import com.example.qly_kho.entity.User;
import com.example.qly_kho.exception.custom.UnauthorizedException;
import com.example.qly_kho.mapper.AuthMapper;
import com.example.qly_kho.mapper.UserMapper;
import com.example.qly_kho.repository.UserRepository;
import com.example.qly_kho.security.jwt.JwtProvider;
import com.example.qly_kho.service.ActivityLogService;
import com.example.qly_kho.service.AuthService;
import com.example.qly_kho.service.RefreshTokenService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;
    private final ActivityLogService activityLogService;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final AuthMapper authMapper;
    private final UserMapper userMapper;
    
    
    @Override
    public AuthUserResponse getAuthUserResponseFromRefreshToken(String refreshToken) {
        User user = getUserFromRefreshToken(refreshToken);
        return userMapper.toAuthUserResponse(user);
    }

    //username, password
    @Override
    public AuthResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
            );
        } catch (Exception e) {
            throw new UnauthorizedException(
                String.format("Invalid username or password for user: %s in AuthService", request.username())
            );
        }
        
        User user = userRepository.findByUsername(request.username())
            .orElseThrow(() -> new UnauthorizedException(
                String.format("User with (username: %s) not found in AuthService", request.username())
            ));

        String accessToken = jwtProvider.generateAccessTokenFromUsername(user.getUsername());
        String refreshToken = jwtProvider.generateRefreshToken(user.getUsername());    

        activityLogService.logActivity(
            user.getId(), 
            ActionConstants.LOGIN, 
            ActionConstants.ENTITY_USER, 
            user.getId(), 
            "User logged in successfully", 
            "127.0.0.1"
        );
        
        //vô hiệu tất cả các refresh token của user
        refreshTokenService.revokeRefreshTokenFromUserId(user.getId());
        //thêm refresh token khi user đăng nhập vào db
        refreshTokenService.addRefreshTokenFromUsername(
            refreshToken,
            request.username()
        );
        
        return authMapper.toAuthResponse(accessToken, refreshToken, AppConstants.JWT_PREFIX, user);
    
    }

    @Override
    public void logout(String refreshToken) {
        if(refreshToken != null) {
                Long userId = getUserFromRefreshToken(refreshToken).getId();
                if(userId != null) {
                    revokeRefreshTokenFromUserId(userId);
                    activityLogService.logActivity(
                        userId, 
                        ActionConstants.LOGOUT, 
                        ActionConstants.ENTITY_USER, 
                        userId, 
                        "User logged out successfully", 
                        "127.0.0.1"
                    );
                }
            }
    }

    @Override
    public User getUserFromRefreshToken(String refreshToken) {
        String username = jwtProvider.getUsernameFromToken(refreshToken);

        return userRepository.findByUsername(username)
            .orElseThrow(()-> new UnauthorizedException(
                "User associated with the refresh token not found in AuthService"
            )); 
    }

    @Override
    public String generateAccessTokenFromRefreshToken(String refreshToken) {
        User user = getUserFromRefreshToken(refreshToken);

        //kiểm tra refresh token hợp lệ, chưa bị revoked, chưa hết hạn
        refreshTokenService.validateRefreshToken(refreshToken, user.getId());
        jwtProvider.validateToken(refreshToken);

        return jwtProvider.generateAccessTokenFromUsername(user.getUsername());
    }


    @Override
    public boolean validateRefreshToken(String token) {
        return jwtProvider.validateToken(token);
    }

    @Override
    public void revokeRefreshTokenFromUserId(Long userId) {
        refreshTokenService.revokeRefreshTokenFromUserId(userId);
    }
}
