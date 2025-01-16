package com.fbcq.be.dto.request;

import jakarta.validation.constraints.*;

public record ProductRequest(
        @NotNull(message = "카테고리 ID는 필수입니다.") Long categoryId,
        @NotBlank(message = "상품 이름은 필수입니다.") String name,
        String description,
        @NotNull(message = "가격은 필수입니다.")
        @Positive(message = "가격은 양수여야 합니다.") Double price,
        @NotNull(message = "재고는 필수입니다.")
        @PositiveOrZero(message = "재고는 0 이상이어야 합니다.") Integer stock
) {}
