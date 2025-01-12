package com.fbcq.be.controller;

import com.fbcq.be.dto.request.LoginRequest;
import com.fbcq.be.dto.request.ResetPasswordRequest;
import com.fbcq.be.dto.request.SignUpRequest;
import com.fbcq.be.dto.response.LoginResponse;
import com.fbcq.be.jwt.JwtUtil;
import com.fbcq.be.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "User API", description = "사용자 관련 REST API")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    // HttpOnly 쿠키 설정 메서드
    public void setHttpOnlyCookie(HttpServletResponse response, String token, String cookieName, int maxAge) {
        Cookie cookie = new Cookie(cookieName, token);
        cookie.setHttpOnly(true); // JavaScript로 접근 불가
        cookie.setSecure(true); // HTTPS에서만 전송
        cookie.setPath("/"); // 모든 경로에서 사용 가능
        cookie.setMaxAge(maxAge); // 쿠키 만료 시간 (초 단위)
        response.addCookie(cookie); // 응답에 쿠키 추가
    }

    @PostMapping("/login")
    @Operation(summary = "사용자 로그인", description = "사용자 이메일과 비밀번호로 로그인합니다.")
    public ResponseEntity<LoginResponse> login(@Validated @RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        log.info("Login request received: {}", loginRequest);

        // 유효한 사용자 확인
        LoginResponse loginResponse = userService.login(loginRequest);
        if (loginResponse == null) {
            log.warn("Login failed for email: {}", loginRequest.email());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        // HttpOnly 쿠키에 JWT Access Token 및 Refresh Token 저장
        setHttpOnlyCookie(response, jwtUtil.generateAccessToken(loginResponse.name()), "accessToken", 15 * 60); // 15분
        setHttpOnlyCookie(response, jwtUtil.generateRefreshToken(loginResponse.name()), "refreshToken", 7 * 24 * 60 * 60); // 7일

        return ResponseEntity.ok().body(loginResponse);
    }


    @PostMapping("/signup")
    @Operation(summary = "사용자 회원가입", description = "새로운 사용자를 등록합니다.")
    public ResponseEntity<String> signup(@Validated @RequestBody SignUpRequest signUpRequest) {
        log.info("SignUp request received: {}", signUpRequest.email());
        int result = userService.signUp(signUpRequest);
        if (result == 0) {
            log.warn("SignUp failed for email: {}", signUpRequest.email());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 실패");
        }
        log.info("SignUp successful for email: {}", signUpRequest.email());
        return ResponseEntity.ok("회원가입 성공");
    }

    @PutMapping("/reset-password")
    @Operation(summary = "사용자 비밀번호 재설정", description = "비밀번호를 재설정합니다.")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        log.info("Password reset request received for email: {}", resetPasswordRequest.email());
        boolean isUpdated = userService.updatePasswordByEmail(resetPasswordRequest.email(), resetPasswordRequest.password());
        if (!isUpdated) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호 재설정 실패");
        }
        return ResponseEntity.ok("비밀번호 재설정 성공");
    }


    @GetMapping("/check-email")
    @Operation(
            summary = "이메일 존재 확인",
            description = "이메일이 데이터베이스에 존재하는지 확인합니다.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    public ResponseEntity<Map<String, Object>> checkEmail(
            @RequestParam
            @Parameter(description = "확인할 이메일 주소", required = true, example = "test@example.com")
            String email
    ) {
        log.info("Check email request received: {}", email);

        boolean isExistEmail = userService.checkEmailExists(email);
        Map<String, Object> response = new HashMap<>();
        response.put("available", !isExistEmail);
        response.put("message", isExistEmail ? "이미 존재하는 이메일입니다." : "사용 가능한 이메일입니다.");

        return ResponseEntity.ok(response);
    }

    // 로그아웃 API
    @PostMapping("/logout")
    @Operation(summary = "사용자 로그아웃", description = "사용자가 서버의 JWT 세션을 만료합니다.")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        // 쿠키 제거 처리
        clearCookie(response, "accessToken");
        clearCookie(response, "refreshToken");
        return ResponseEntity.ok("로그아웃 성공");
    }

    // 공통 Cookie 제거 메서드
    private void clearCookie(HttpServletResponse response, String cookieName) {
        setHttpOnlyCookie(response, cookieName, "logout", 0); // 만료 시간 0으로 설정
    }
}
