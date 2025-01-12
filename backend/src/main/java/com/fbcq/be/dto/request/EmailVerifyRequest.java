package com.fbcq.be.dto.request;

public record EmailVerifyRequest(
        String email,
        String code
) {
}
