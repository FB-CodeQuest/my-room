package com.fbcq.be.controller;

import com.fbcq.be.dto.request.ProductRequest;
import com.fbcq.be.dto.response.ProductResponse;
import com.fbcq.be.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Slf4j
@Validated
public class ProductController {

    private final ProductService productService;

    @GetMapping("/{id}")
    @Operation(summary = "상품 조회", description = "상품 ID로 상품 정보를 조회합니다.")
    public ResponseEntity<?> getProductById(
            @Parameter(description = "조회할 상품 ID", required = true, example = "1")
            @PathVariable Long id
    ) {
        ProductResponse productResponse = productService.getProductById(id);
        if (productResponse == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "{" +
                            "  \"errorCode\": \"PRODUCT_NOT_FOUND\"," +
                            "  \"errorMessage\": \"Product not found with ID: " + id + "\"" +
                            "}"
            );
        }
        return ResponseEntity.ok(productResponse);
    }

    @GetMapping
    @Operation(summary = "상품 목록 조회", description = "모든 상품의 목록을 반환합니다.")
    public ResponseEntity<?> getAllProducts(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        List<ProductResponse> products = productService.getAllProducts(page, size);
        return ResponseEntity.ok(products);
    }

    @PostMapping
    @Operation(summary = "상품 생성", description = "새로운 상품을 생성합니다.")
    public ResponseEntity<?> createProduct(
            @Validated @RequestBody ProductRequest productRequest
    ) {
        ProductResponse createdProduct = productService.createProduct(productRequest);
        if (createdProduct == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    "{" +
                            "  \"errorCode\": \"PRODUCT_CREATION_FAILED\"," +
                            "  \"errorMessage\": \"Failed to create product.\"" +
                            "}"
            );
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
    }

    @PutMapping("/{id}")
    @Operation(summary = "상품 수정", description = "상품 정보를 수정합니다.")
    public ResponseEntity<?> updateProduct(
            @Parameter(description = "수정할 상품 ID", required = true, example = "1")
            @PathVariable Long id,
            @Validated @RequestBody ProductRequest productRequest
    ) {
        ProductResponse updatedProduct = productService.updateProduct(id, productRequest);
        if (updatedProduct == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "{" +
                            "  \"errorCode\": \"PRODUCT_NOT_FOUND\"," +
                            "  \"errorMessage\": \"Product not found with ID: " + id + "\"" +
                            "}"
            );
        }
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "상품 삭제", description = "상품을 삭제합니다.")
    public ResponseEntity<?> deleteProduct(
            @Parameter(description = "삭제할 상품 ID", required = true, example = "1")
            @PathVariable Long id
    ) {
        boolean isDeleted = productService.deleteProduct(id);
        if (!isDeleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "{" +
                            "  \"errorCode\": \"PRODUCT_NOT_FOUND\"," +
                            "  \"errorMessage\": \"Product not found with ID: " + id + "\"" +
                            "}"
            );
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
