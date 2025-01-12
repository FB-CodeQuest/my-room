package com.fbcq.be.service;

import com.fbcq.be.dto.request.EmailVerifyRequest;

public interface EmailService {
    void sendVerificationEmail(String email);
    boolean verifyToken(EmailVerifyRequest emailVerifyRequest);
}
