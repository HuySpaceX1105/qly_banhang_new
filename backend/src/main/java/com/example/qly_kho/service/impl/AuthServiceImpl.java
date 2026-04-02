package com.example.qly_kho.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.qly_kho.constant.ActionConstants;
import com.example.qly_kho.constant.AppConstants;
import com.example.qly_kho.dto.request.auth.LoginRequest;
import com.example.qly_kho.dto.request.auth.RegisterRequest;
import com.example.qly_kho.dto.response.AuthResponse;
import com.example.qly_kho.entity.Role;
import com.example.qly_kho.entity.User;
import com.example.qly_kho.exception.custom.UnauthorizedException;
import com.example.qly_kho.mapper.AuthMapper;
import com.example.qly_kho.security.jwt.JwtProvider;
import com.example.qly_kho.security.jwt.payload.RefreshTokenPayLoad;
import com.example.qly_kho.service.ActivityLogService;
import com.example.qly_kho.service.AuthService;
import com.example.qly_kho.service.RefreshTokenService;
import com.example.qly_kho.service.RoleService;
import com.example.qly_kho.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService{

    private final UserService userService;
    private final RoleService roleService;
    private final ActivityLogService activityLogService;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final AuthMapper authMapper;
    
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
        
        User user = userService.findByUsername(request.username());

        String accessToken = jwtProvider.generateAccessTokenFromUsername(user.getUsername(), user.getAuthVersion(), user.getPermissionVersion());
        String refreshToken = jwtProvider.generateRefreshToken(user.getUsername(), user.getAuthVersion());    

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

            String username = jwtProvider.getUsernameFromToken(refreshToken);
            Long userId = userService.findByUsername(username).getId();
            
            refreshTokenService.revokeRefreshTokenFromUserId(userId);
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

    @Override
    public void register(RegisterRequest registerRequest) {
        User newUser = User.createUser(
            registerRequest.username(),
            passwordEncoder.encode(registerRequest.password()),
            registerRequest.email(),
            registerRequest.fullName()
        );
        
        User savedUser = userService.saveUser(newUser);

        Role role = roleService.findById(3L);
        savedUser.addRole(role);

        User updatedUser = userService.updateUser(savedUser);

        activityLogService.logActivity(
            updatedUser.getId(), 
            ActionConstants.REGISTER, 
            ActionConstants.ENTITY_USER, 
            updatedUser.getId(), 
            "User registered successfully", 
            "127.0.0.1"
        );
    }
    

    @Override
    public AuthResponse refreshToken(String refreshToken) {

        //kiểm tra refresh token hợp lệ, chưa bị revoked, chưa hết hạn và lấy username từ refresh token
        RefreshTokenPayLoad refreshTokenPayLoad = jwtProvider.parseRefreshToken(refreshToken);
        String username = refreshTokenPayLoad.username();
        Long authVersion = refreshTokenPayLoad.authVersion();

        //tìm kiếm user theo username
        User user = userService.findByUsername(username);
        if(!authVersion.equals(user.getAuthVersion())) {
            throw new UnauthorizedException(
                String.format("Invalid refresh token for user: %s in AuthService", username)
            );
        }

        //kiểm tra refresh token hợp lệ, chưa bị revoked, chưa hết hạn
        refreshTokenService.validateRefreshToken(refreshToken);

        String accessToken = jwtProvider.generateAccessTokenFromUsername(user.getUsername(), user.getAuthVersion(), user.getPermissionVersion());

        return authMapper.toAuthResponse(accessToken, null, AppConstants.JWT_PREFIX, user);
    }
}
