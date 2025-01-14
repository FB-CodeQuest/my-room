package com.fbcq.be.service;

import com.fbcq.be.domain.Product;
import com.fbcq.be.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductMapper productMapper;

    @Override
    public Product getProductById(Long productId) {
        return productMapper.selectProductById(productId);
    }

    @Override
    public List<Product> getAllProducts() {
        return productMapper.selectAllProducts();
    }

    @Override
    public int createProduct(Product product) {
        return productMapper.insertProduct(product);
    }

    @Override
    public int updateProduct(Product product) {
        return productMapper.updateProduct(product);
    }

    @Override
    public int deleteProduct(Long productId) {
        return productMapper.deleteProduct(productId);
    }
}
