package com.fbcq.be.controller;

import com.fbcq.be.dto.request.LoginRequest;
import com.fbcq.be.dto.request.SignUpRequest;
import com.fbcq.be.dto.response.LoginResponse;
import com.fbcq.be.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "User API", description = "사용자 관련 REST API")
public class UserController {

    private final UserService userService;

    @PostMapping("/login")
    @Operation(summary = "사용자 로그인", description = "사용자 이메일과 비밀번호로 로그인합니다.")
    public ResponseEntity<LoginResponse> login(@Validated @RequestBody LoginRequest loginRequest) {
        log.info("Login request received: {}", loginRequest.email());
        LoginResponse loginResponse = userService.login(loginRequest);
        if (loginResponse == null) {
            log.warn("Login failed for email: {}", loginRequest.email());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        log.info("Login successful for userId: {}", loginResponse.userId());
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/signup")
    @Operation(summary = "사용자 회원가입", description = "새로운 사용자를 등록합니다.")
    public ResponseEntity<String> signup(@Validated @RequestBody SignUpRequest signUpRequest) {
        log.info("SignUp request received: {}", signUpRequest);
        System.out.println(signUpRequest);
        int result = userService.signUp(signUpRequest);
        if (result == 0) {
            log.warn("SignUp failed for email: {}", signUpRequest.email());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("회원가입 실패");
        }
        log.info("SignUp successful for email: {}", signUpRequest.email());
        return ResponseEntity.ok("회원가입 성공");
    }

    @PutMapping("/reset-password")
    @Operation(summary = "사용자 비밀번호 재설정", description = "비밀번호를 재설정 합니다.")
    public ResponseEntity<String> resetPassword(@RequestParam String email, @RequestParam String password) {
        log.info("Renewal password request received: {}", password);
        boolean isUpdated = userService.updatePasswordByEmail(email, password);
        if (!isUpdated) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("비밀번호 재설정 실패");
        }

        return ResponseEntity.ok("비밀번호 재설정 성공");
    }
}
