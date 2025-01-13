package com.fbcq.be.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

//    @Override
//    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
//        String path = request.getServletPath();
//        // login과 register 경로는 필터링 제외
//        log.info("path: {}", path);
//        return path.equals("/api/users/login") || path.equals("/api/users/register");
//    }
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        return path.matches("^/api/(email/(send|verify)|users/(login|signup|check-email))$");
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {

        // 1. 쿠키에서 JWT 추출
        String token = extractJwtFromCookies(request);

        if (token == null) {
            log.warn("JWT not found in cookies");
            filterChain.doFilter(request, response);
            return;
        }

        log.info("JWT found in cookies: {}", token);

        try {
            // 2. JWT 검증
            if (jwtUtil.validateToken(token)) {
                log.info("JWT is valid");

                // 3. 사용자 정보 추출
                String username = jwtUtil.extractUsername(token);
                log.info("Extracted username from JWT: {}", username);

                // 4. SecurityContext 설정
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(username, null, null);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                log.warn("JWT is invalid");
            }
        } catch (Exception e) {
            log.error("Error occurred while validating JWT: {}", e.getMessage());
        }

        // 5. 다음 필터로 이동
        filterChain.doFilter(request, response);
    }

    /**
     * 요청의 쿠키에서 accessToken 추출
     *
     * @param request HttpServletRequest
     * @return JWT 토큰 값 또는 null
     */
    private String extractJwtFromCookies(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("accessToken".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
