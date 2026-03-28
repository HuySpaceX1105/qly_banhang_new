package com.example.qly_kho.service.impl;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.example.qly_kho.constant.ActionConstants;
import com.example.qly_kho.constant.AppConstants;
import com.example.qly_kho.dto.request.LoginRequest;
import com.example.qly_kho.dto.request.RegisterRequest;
import com.example.qly_kho.dto.response.AuthResponse;
import com.example.qly_kho.dto.response.AuthUserResponse;
import com.example.qly_kho.entity.User;
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
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public AuthUserResponse getAuthUserResponseFromRefreshToken(String refreshToken) {
        User user = getUserFromRefreshToken(refreshToken);
        return userMapper.toAuthUserResponse(user);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password()));

            String accessToken = jwtProvider.generateAccessToken(authentication);
            String refreshToken = jwtProvider.generateRefreshToken(request.username());

            User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

            activityLogService.logActivity(
                user.getId(), 
                ActionConstants.LOGIN, 
                ActionConstants.ENTITY_USER, 
                user.getId(), 
                "User logged in successfully", 
                "127.0.0.1"
            );
            
            refreshTokenService.revokeRefreshTokenFromUserId(user.getId());
            refreshTokenService.addRefreshTokenFromUsername(
                refreshToken,
                request.username()
            );

            return authMapper.toAuthResponse(accessToken, refreshToken, AppConstants.JWT_PREFIX, user);
            
        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Invalid username or password");
        }
        
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
        public void register(RegisterRequest request) {

            // 1. check username tồn tại
            if (userRepository.findByUsername(request.getUsername()).isPresent()) {
                throw new IllegalArgumentException("Username đã tồn tại");
            }

            // 2. check email tồn tại
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new IllegalArgumentException("Email đã tồn tại");
            }

            // 3. tạo user
            User user = User.createUser(
                request.getUsername(),
                passwordEncoder.encode(request.getPassword()),
                request.getEmail(),
                request.getFullName()
            );

            userRepository.save(user);

            // log
            activityLogService.logActivity(
                user.getId(),
                ActionConstants.CREATE,
                ActionConstants.ENTITY_USER,
                user.getId(),
                "User registered",
                "127.0.0.1"
            );
        }



    @Override
    public User getUserFromRefreshToken(String refreshToken) {
        String username = jwtProvider.getUsernameFromToken(refreshToken);

        return userRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("User not found"));
    }

    @Override
    public String generateAccessTokenFromRefreshToken(String refreshToken) {
        User user = getUserFromRefreshToken(refreshToken);

        //kiểm tra refresh token hợp lệ, chưa bị revoked, chưa hết hạn
        boolean isValidInDatabase = refreshTokenService.validateRefreshToken(refreshToken, user.getId());
        boolean isValidInCookies = jwtProvider.validateToken(refreshToken);
        if (!isValidInDatabase|| !isValidInCookies) {
            throw new IllegalArgumentException("Isvalidate refresh token");
        }

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
