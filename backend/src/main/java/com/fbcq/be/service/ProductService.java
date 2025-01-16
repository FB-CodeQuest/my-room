package com.fbcq.be.service;

import com.fbcq.be.domain.Product;
import com.fbcq.be.dto.request.ProductRequest;
import com.fbcq.be.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {
    ProductResponse getProductById(Long productId);
    List<ProductResponse> getAllProducts(int page, int size);
    ProductResponse createProduct(ProductRequest productRequest);
    ProductResponse updateProduct(Long id, ProductRequest request);
    boolean deleteProduct(Long productId);
}
