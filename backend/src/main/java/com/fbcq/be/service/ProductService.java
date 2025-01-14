package com.fbcq.be.service;

import com.fbcq.be.domain.Product;

import java.util.List;

public interface ProductService {
    Product getProductById(Long productId);
    List<Product> getAllProducts();
    int createProduct(Product product);
    int updateProduct(Product product);
    int deleteProduct(Long productId);
}
