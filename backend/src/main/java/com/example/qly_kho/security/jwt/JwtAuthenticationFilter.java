package com.example.qly_kho.security.jwt;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.qly_kho.constant.AppConstants;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{

    private final JwtProvider jwtProvider;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

                try {

                    String path = request.getRequestURI();

                    if (path.equals("/login.html") || path.startsWith("/api/auth/")) {
        filterChain.doFilter(request, response); // Cho qua luôn, không kiểm tra token
        return;
    }
                    
                    String token = getTokenFromRequest(request);

                    if(StringUtils.hasText(token) && jwtProvider.validateToken(token)) {

                        String username = jwtProvider.getUsernameFromToken(token);
                        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());

                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }
                } catch (Exception e) {}

                filterChain.doFilter(request, response);

    } 

    private String getTokenFromRequest(HttpServletRequest request)  {
        String bearerToken = request.getHeader(AppConstants.JWT_HEADER);
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith(AppConstants.JWT_PREFIX)) {
            return bearerToken.substring(AppConstants.JWT_PREFIX.length());
        }

        return null;
    }
}
