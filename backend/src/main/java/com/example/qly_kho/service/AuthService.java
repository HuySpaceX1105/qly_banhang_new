package com.example.qly_kho.service;

import com.example.qly_kho.dto.request.LoginRequest;
import com.example.qly_kho.dto.response.AuthResponse;
import com.example.qly_kho.dto.response.AuthUserResponse;
import com.example.qly_kho.entity.User;

public interface AuthService {
    
    //xử lý đăng nhập
    AuthResponse login(LoginRequest loginRequest );

    void logout(String refreshToken);
    
    AuthUserResponse getAuthUserResponseFromRefreshToken(String refreshToken);

    boolean validateRefreshToken(String token);

    String generateAccessTokenFromRefreshToken(String refreshToken);

    User getUserFromRefreshToken(String refreshToken);

    void revokeRefreshTokenFromUserId(Long userId);

}