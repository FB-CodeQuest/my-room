package com.fbcq.be.dto.request;

public record LoginRequest(
        String email,
        String password
) {
};
