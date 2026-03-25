package com.example.qly_kho.service.impl;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.qly_kho.entity.RefreshToken;
import com.example.qly_kho.entity.User;
import com.example.qly_kho.repository.RefreshTokenRepository;
import com.example.qly_kho.repository.UserRepository;
import com.example.qly_kho.security.jwt.JwtProvider;
import com.example.qly_kho.service.RefreshTokenService;
import com.example.qly_kho.util.SHA256Hasher;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    @Override
    public void addRefreshTokenFromUsername(String token, String username) {

        String tokenHash = SHA256Hasher.hash(token);
        User user = userRepository.findByUsername(username).orElseThrow(()-> new RuntimeException("User not found"));
        LocalDateTime expiryDate = LocalDateTime.ofInstant(Instant.now().plusMillis(jwtProvider.getRefreshExpiration()), ZoneId.systemDefault());
        
        refreshTokenRepository.save(RefreshToken.createRefreshToken(tokenHash, user, expiryDate));
    }

    @Override
    public boolean validateRefreshToken(String token, Long userId) {
        LocalDateTime now = LocalDateTime.now();

        Set<RefreshToken> tokens = refreshTokenRepository.findAllByUserId(userId);

        // Kiểm tra token hợp lệ: chưa revoke, chưa hết hạn, matches hash
        return tokens.stream()
            .anyMatch(rt -> !rt.isRevoked()
                        && rt.getExpiryDate().isAfter(now)
                        && SHA256Hasher.hash(token).equals(rt.getTokenHash()));
    }

    @Override
    public void revokeRefreshTokenFromUserId(Long userId) {
        Set<RefreshToken> tokens = refreshTokenRepository.findAllByUserId(userId);
        tokens.forEach(token -> token.setRevoked(true));
        refreshTokenRepository.saveAll(tokens);
    }
}
