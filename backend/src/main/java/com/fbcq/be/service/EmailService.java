package com.fbcq.be.service;

public interface EmailService {
    void sendVerificationEmail(String email);
    boolean verifyToken(String email, String verificationCode);
}
