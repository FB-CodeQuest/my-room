package com.fbcq.be.controller;

import com.fbcq.be.dto.request.EmailRequest;
import com.fbcq.be.dto.request.EmailVerifyRequest;
import com.fbcq.be.dto.response.EmailResponse;
import com.fbcq.be.service.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/email")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/send")
    @Operation(summary = "인증 이메일 발송", description = "사용자가 입력한 이메일 주소로 6자리 인증 코드를 발송합니다.")
    public ResponseEntity<EmailResponse> sendVerificationEmail(
            @RequestBody @Parameter(description = "인증 이메일 주소") EmailRequest emailRequest) {
        emailService.sendVerificationEmail(emailRequest.email());
        return ResponseEntity.ok(new EmailResponse("인증 이메일이 성공적으로 발송되었습니다.", true));
    }

    @PostMapping("/verify")
    @Operation(summary = "인증 코드 확인", description = "발송된 6자리 인증 코드를 확인하여 인증을 완료합니다.")
    public ResponseEntity<EmailResponse> verifyEmail(@RequestBody EmailVerifyRequest emailVerifyRequest) {
        boolean isVerified = emailService.verifyToken(emailVerifyRequest);
        if (isVerified) {
            return ResponseEntity.ok(new EmailResponse("이메일 인증에 성공했습니다.", true));
        }
        return ResponseEntity.badRequest().body(new EmailResponse("인증 코드가 잘못되었거나 만료되었습니다.", false));
    }
}
