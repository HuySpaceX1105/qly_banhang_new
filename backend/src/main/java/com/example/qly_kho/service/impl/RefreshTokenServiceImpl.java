package com.example.qly_kho.service.impl;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.qly_kho.entity.RefreshToken;
import com.example.qly_kho.entity.User;
import com.example.qly_kho.exception.ErrorCode;
import com.example.qly_kho.exception.custom.AppException;
import com.example.qly_kho.exception.custom.NotFoundException;
import com.example.qly_kho.exception.custom.UnauthorizedException;
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
        User user = userRepository.findByUsername(username)
            .orElseThrow(()-> new NotFoundException(
                String.format("User with (username: %s) not found in RefreshTokenService", username)
            ));
        LocalDateTime expiryDate = LocalDateTime.ofInstant(Instant.now().plusMillis(jwtProvider.getRefreshExpiration()), ZoneId.systemDefault());
        
        try {
            refreshTokenRepository.save(RefreshToken.createRefreshToken(tokenHash, user, expiryDate));
        } catch (Exception e) {
            throw new AppException(
                ErrorCode.INTERNAL_ERROR, 
                String.format("Failed to save refresh token in RefreshTokenService: %s", e.getMessage())
            );
        }
    }

    @Override
    public boolean validateRefreshToken(String token, Long userId) {
        LocalDateTime now = LocalDateTime.now();

        Set<RefreshToken> tokens = refreshTokenRepository.findAllByUserId(userId);

        // Kiểm tra token hợp lệ: chưa revoke, chưa hết hạn, matches hash
        boolean isValid = tokens.stream()
                            .anyMatch(rt -> !rt.isRevoked()
                                        && rt.getExpiryDate().isAfter(now)
                                        && SHA256Hasher.hash(token).equals(rt.getTokenHash()));

        if (!isValid) {
            throw new UnauthorizedException("Refresh token is invalid in RefreshTokenService");
        }
        return true;
    }

    @Override
    public void revokeRefreshTokenFromUserId(Long userId) {


        Set<RefreshToken> tokens = refreshTokenRepository.findAllByUserId(userId);
        tokens.forEach(token -> token.setRevoked(true));
        try {
            refreshTokenRepository.saveAll(tokens);
        } catch (Exception e) {
            throw new AppException(
                ErrorCode.INTERNAL_ERROR, 
                String.format("Failed to revoke refresh token in RefreshTokenService: %s", e.getMessage())
            );
        }
    }
}
