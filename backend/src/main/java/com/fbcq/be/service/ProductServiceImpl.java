package com.fbcq.be.service;

import com.fbcq.be.domain.Product;
import com.fbcq.be.dto.request.ProductRequest;
import com.fbcq.be.dto.response.ProductResponse;
import com.fbcq.be.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductMapper productMapper;

    @Override
    public ProductResponse getProductById(Long id) {
        Product product = productMapper.selectProductById(id);
        if (product == null) {
            throw new IllegalArgumentException("Product not found with ID: " + id);
        }
        return toResponse(product);
    }

    @Override
    public List<ProductResponse> getAllProducts(int page, int size) {
        List<Product> products = productMapper.selectAllProducts(page, size);
        return products.stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Override
    public ProductResponse createProduct(ProductRequest request) {
        Product product = toEntity(request);
        int result = productMapper.insertProduct(product);
        if (result == 0) {
            throw new IllegalStateException("Failed to create product.");
        }
        return toResponse(product);
    }

    @Override
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product existingProduct = productMapper.selectProductById(id);
        if (existingProduct == null) {
            throw new IllegalArgumentException("Product not found with ID: " + id);
        }

        Product updatedProduct = Product.builder()
                .productId(id)
                .categoryId(request.categoryId())
                .name(request.name())
                .description(request.description())
                .price(request.price())
                .stock(request.stock())
                .build();

        int result = productMapper.updateProduct(updatedProduct);
        if (result == 0) {
            throw new IllegalStateException("Failed to update product with ID: " + id);
        }
        return toResponse(updatedProduct);
    }

    @Override
    public boolean deleteProduct(Long id) {
        Product existingProduct = productMapper.selectProductById(id);
        if (existingProduct == null) {
            throw new IllegalArgumentException("Product not found with ID: " + id);
        }

        int result = productMapper.deleteProduct(id);
        return result > 0;
    }

    private Product toEntity(ProductRequest request) {
        return Product.builder()
                .categoryId(request.categoryId())
                .name(request.name())
                .description(request.description())
                .price(request.price())
                .stock(request.stock())
                .build();
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getProductId(),
                product.getCategoryId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock()
        );
    }
}
