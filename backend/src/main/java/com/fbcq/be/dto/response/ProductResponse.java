package com.fbcq.be.dto.response;

public record ProductResponse(
        Long productId,
        Long categoryId,
        String name,
        String description,
        Double price,
        Integer stock
) {}
