package com.example.qly_kho.service;

import com.example.qly_kho.dto.request.LoginRequest;
import com.example.qly_kho.dto.request.RegisterRequest;
import com.example.qly_kho.dto.response.AuthResponse;

public interface AuthService {
    
    //xử lý đăng nhập
    AuthResponse login(LoginRequest loginRequest );

    void logout(String refreshToken);

    void register(RegisterRequest registerRequest);

    AuthResponse refreshToken(String refreshToken);

}