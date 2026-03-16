package com.example.qly_kho.dto.response;

import java.util.Set;

public record AuthUserResponse(
    Long userId,
    String username,
    Set<String> roles
) {}
