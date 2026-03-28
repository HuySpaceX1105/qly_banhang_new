    package com.example.qly_kho.controller;

    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.CookieValue;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.RequestBody;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RestController;

    import com.example.qly_kho.constant.AppConstants;
    import com.example.qly_kho.dto.request.LoginRequest;
import com.example.qly_kho.dto.request.RegisterRequest;
import com.example.qly_kho.dto.response.AuthResponse;
    import com.example.qly_kho.service.AuthService;

    import jakarta.servlet.http.Cookie;
    import jakarta.servlet.http.HttpServletResponse;
    import jakarta.validation.Valid;
    import lombok.RequiredArgsConstructor;

    @RestController
    @RequestMapping("/api/auth")
    @RequiredArgsConstructor
    public class AuthController {
        
        private final AuthService authService;

        
        @PostMapping("/login")
        public ResponseEntity<AuthResponse> login(@RequestBody @Valid LoginRequest request, HttpServletResponse response) {

            AuthResponse authResponse = authService.login(request);

            Cookie refreshTokenCookie = new Cookie("refreshToken", authResponse.refreshToken());
            refreshTokenCookie.setHttpOnly(true);
            refreshTokenCookie.setSecure(false);//dev
            refreshTokenCookie.setPath("/api/auth/");
            refreshTokenCookie.setMaxAge(24 * 60 * 60);

            response.addCookie(refreshTokenCookie);

            return ResponseEntity.ok(new AuthResponse(
                authResponse.accessToken(), 
                null, 
                authResponse.tokenType(), 
                authResponse.user()
            ));
        }

        @PostMapping("/refresh-token")
        public ResponseEntity<AuthResponse> refreshToken(@CookieValue(name = "refreshToken", required = false) String refreshToken) {

                if(refreshToken == null || !authService.validateRefreshToken(refreshToken)) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
                }
                
                String accessToken = authService.generateAccessTokenFromRefreshToken(refreshToken);
                return ResponseEntity.ok(new AuthResponse(
                    accessToken, 
                    null, 
                    AppConstants.JWT_PREFIX, 
                    authService.getAuthUserResponseFromRefreshToken(refreshToken)
                ));
        }

        @PostMapping("/logout")
        public ResponseEntity<Void> logout(@CookieValue(name = "refreshToken", required = false) String refreshToken, HttpServletResponse response) {

            System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + refreshToken);
            Cookie cookie = new Cookie("refreshToken", null);
            cookie.setHttpOnly(true);
            cookie.setSecure(false);//dev
            cookie.setMaxAge(0);
            cookie.setPath("/api/auth/refresh-token");
            response.addCookie(cookie);

            authService.logout(refreshToken);

            return ResponseEntity.ok().build();
        }

        @PostMapping("/register")
            public String register(@RequestBody RegisterRequest request) {
                authService.register(request);
                return "Đăng ký thành công";
        }
    }
