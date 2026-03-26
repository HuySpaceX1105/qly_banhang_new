package com.example.qly_kho.security.jwt;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.qly_kho.constant.AppConstants;
import com.example.qly_kho.exception.custom.UnauthorizedException;

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
                    
                    String token = getTokenFromRequest(request);

                    if(StringUtils.hasText(token) && jwtProvider.validateToken(token)) {

                        String username = jwtProvider.getUsernameFromToken(token);
                        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());

                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }
                } catch (UnauthorizedException e) {
                    // JWT invalid / expired
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
                    return; // dừng chain
                } catch (Exception e) {
                    // Các lỗi khác
                    response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Internal server error in JWT filter");
                    return;
                }
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
