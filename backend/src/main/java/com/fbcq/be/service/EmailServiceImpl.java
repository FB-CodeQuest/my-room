package com.fbcq.be.service;

import com.fbcq.be.dto.request.EmailVerifyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    private final Map<String, VerificationInfo> verificationCodeStorage = new HashMap<>();

    @Value("${spring.mail.username}") // 네이버 SMTP 이메일 주소
    private String fromEmail;

    private static final long VERIFICATION_CODE_EXPIRATION = 3 * 60 * 1000; // 3분 (밀리초)

    @Override
    public void sendVerificationEmail(String email) {
        // 6자리 인증 코드 생성
        String verificationCode = String.format("%06d", new Random().nextInt(999999));
        long timestamp = System.currentTimeMillis(); // 현재 시간 저장

        // 이메일-코드-생성 시간 매핑 저장
        verificationCodeStorage.put(email, new VerificationInfo(verificationCode, timestamp));

        // 이메일 메시지 작성
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your Verification Code");
        message.setText("Your verification code is: " + verificationCode);
        message.setFrom(fromEmail);
        mailSender.send(message);
    }

    @Override
    public boolean verifyToken(EmailVerifyRequest emailVerifyRequest) {
        // 저장된 인증 정보 가져오기
        VerificationInfo verificationInfo = verificationCodeStorage.get(emailVerifyRequest.email());

        if (verificationInfo != null) {
            long currentTime = System.currentTimeMillis();
            // 유효 시간 초과 여부 확인
            if (currentTime - verificationInfo.getTimestamp() <= VERIFICATION_CODE_EXPIRATION) {
                // 인증 코드 검증
                if (verificationInfo.getCode().equals(emailVerifyRequest.code())) {
                    verificationCodeStorage.remove(emailVerifyRequest.email()); // 인증 완료 후 코드 삭제
                    return true;
                }
            } else {
                // 유효 시간 초과 시 인증 코드 제거
                verificationCodeStorage.remove(emailVerifyRequest.email());
            }
        }
        return false;
    }

    // 인증 정보 객체
    private static class VerificationInfo {
        private final String code;
        private final long timestamp;

        public VerificationInfo(String code, long timestamp) {
            this.code = code;
            this.timestamp = timestamp;
        }

        public String getCode() {
            return code;
        }

        public long getTimestamp() {
            return timestamp;
        }
    }
}
