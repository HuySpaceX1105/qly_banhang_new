package com.example.qly_kho.dto.response;

public record AuthResponse(
    String accessToken,
    String refreshToken,
    String tokenType,
    AuthUserResponse user //userId, username, roles, fullName, email
) {}