package com.fbcq.be.dto.request;

public record ResetPasswordRequest(
        String email,
        String password
) {
}
