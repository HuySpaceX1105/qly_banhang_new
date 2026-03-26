package com.example.qly_kho.security.jwt;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.example.qly_kho.config.JwtProperties;
import com.example.qly_kho.exception.custom.UnauthorizedException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {
    
    private final SecretKey secretKey;
    private final JwtProperties jwtProperties;

    public JwtProvider(JwtProperties jwtProperties) {
        this.secretKey = Keys.hmacShaKeyFor(jwtProperties.secret().getBytes(StandardCharsets.UTF_8));
        this.jwtProperties = jwtProperties;
    }

    public String generateAccessToken(Authentication authentication) {
        String username = authentication.getName();
        Date now = new Date();
        Date expiry = new Date(now.getTime() + jwtProperties.accessExpire());

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }    


    public String generateAccessTokenFromUsername(String username) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + jwtProperties.accessExpire());

        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(now)
            .setExpiration(expiry)
            .signWith(secretKey, SignatureAlgorithm.HS512)
            .compact();
    }

    public String generateRefreshToken(String username) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + jwtProperties.refreshExpire());

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(secretKey, SignatureAlgorithm.HS512)
                .compact();
    }

    private Claims getAllClaimsFromToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new UnauthorizedException(
                String.format("JWT token has expired in JwtProvider : %s", e.getMessage())
            );
        } catch (JwtException e) {
            throw new UnauthorizedException(
                String.format("JWT token is invalid in JwtProvider : %s", e.getMessage())
            );
        }
    }

    public String getUsernameFromToken(String token) {
        try {
            Claims claims = getAllClaimsFromToken(token);
            return claims.getSubject();
        } catch (ExpiredJwtException e) {
            throw new UnauthorizedException(
                String.format("JWT token has expired in JwtProvider : %s", e.getMessage())
            );
        } catch (JwtException e) {
            throw new UnauthorizedException(
                String.format("JWT token is invalid in JwtProvider : %s", e.getMessage())
            );
        }
    }


    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token);

            return true;    
        } catch (JwtException e) {
            throw new UnauthorizedException(
                String.format("JWT token is invalid in JwtProvider : %s", e.getMessage())
            );
        }
    } 
    
    public boolean isTokenExpired(String token) {
        try {
            Claims claims = getAllClaimsFromToken(token);
            return claims.getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            throw new UnauthorizedException(
                String.format("JWT token has expired in JwtProvider : %s", e.getMessage())
            );
        }
    }

    public long getAccessExpiration() {
        return jwtProperties.accessExpire();
    }
    public long getRefreshExpiration() {
        return jwtProperties.refreshExpire();
    }
}
