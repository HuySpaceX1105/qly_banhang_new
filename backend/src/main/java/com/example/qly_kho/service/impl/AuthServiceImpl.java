package com.example.qly_kho.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.qly_kho.constant.ActionConstants;
import com.example.qly_kho.constant.AppConstants;
import com.example.qly_kho.dto.request.LoginRequest;
import com.example.qly_kho.dto.response.AuthResponse;
import com.example.qly_kho.entity.User;
import com.example.qly_kho.mapper.AuthMapper;
import com.example.qly_kho.repository.UserRepository;
import com.example.qly_kho.security.jwt.JwtProvider;
import com.example.qly_kho.service.ActivityLogService;
import com.example.qly_kho.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;
    private final ActivityLogService activityLogService;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;
    private final AuthMapper authMapper;
    
    @Override
    public AuthResponse login(LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password()));

            String accessToken = jwtProvider.generateAccessToken(authentication);
            String refreshToken = jwtProvider.generateRefreshToken(request.username());

            User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new RuntimeException());

            activityLogService.logActivity(
                user.getId(), 
                ActionConstants.LOGIN, 
                ActionConstants.ENTITY_USER, 
                user.getId(), 
                "User logged in successfully", 
                "127.0.0.1");

            return authMapper.toAuthResponse(accessToken, refreshToken, AppConstants.JWT_PREFIX, user);
            
        } catch (Exception e) {
            e.printStackTrace();
            throw new IllegalArgumentException("Invalid username or password");
        }
        
    }
    
}
