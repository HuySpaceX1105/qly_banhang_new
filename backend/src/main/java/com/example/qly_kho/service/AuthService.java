package com.example.qly_kho.service;

import com.example.qly_kho.dto.request.LoginRequest;
import com.example.qly_kho.dto.response.AuthResponse;

public interface AuthService {
    
    AuthResponse login(LoginRequest loginRequest );
}