package com.fbcq.be.mapper;

import com.fbcq.be.domain.Product;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductMapper {
    Product selectProductById(Long id);
    List<Product> selectAllProducts();
    int insertProduct(Product product);
    int updateProduct(Product product);
    int deleteProduct(Long id);

}
