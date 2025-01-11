package com.fbcq.be.dto.response;

public record LoginResponse(
        Long userId,
        String name,
        String password // 내부 검증용
) {
}
