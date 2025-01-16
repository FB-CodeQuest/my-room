package com.fbcq.be.mapper;

import com.fbcq.be.domain.Product;
import com.fbcq.be.dto.request.ProductRequest;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {
    Product selectProductById(Long id);

    List<Product> selectAllProducts(@Param("offset") int offset, @Param("limit") int limit);

    int insertProduct(Product product);

    int updateProduct(Product product);

    int deleteProduct(Long id);
}
