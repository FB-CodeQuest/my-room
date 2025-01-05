package com.fbcq.be.dto.response;

public record EmailResponse(
        String message,
        boolean success
//        int statusCode // HTTP 상태 코드 success
) {
}
