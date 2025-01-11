package com.fbcq.be.service;

import com.fbcq.be.dto.request.EmailVerifyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    private final Map<String, String> verificationCodeStorage = new HashMap<>();

    @Value("${spring.mail.username}") // 네이버 SMTP 이메일 주소
    private String fromEmail;

    @Override
    public void sendVerificationEmail(String email) {
        // 6자리 인증 코드 생성
        String verificationCode = String.format("%06d", new Random().nextInt(999999));
        verificationCodeStorage.put(email, verificationCode); // 이메일-코드 매핑 저장

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
        // 저장된 인증 코드와 사용자 입력 코드 비교
        String storedCode = verificationCodeStorage.get(emailVerifyRequest.email());
        if (storedCode != null && storedCode.equals(emailVerifyRequest.code())) {
            verificationCodeStorage.remove(emailVerifyRequest.email()); // 인증 완료 후 코드 삭제
            return true;
        }
        return false;
    }
}
