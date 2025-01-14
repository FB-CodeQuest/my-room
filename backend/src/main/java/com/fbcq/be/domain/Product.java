package com.fbcq.be.domain;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
public class Product {
    private Long productId;
    private Long categoryId;
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
