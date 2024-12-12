package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.ProductDTO;
import com.project.harmonie_e_commerce.dto.ProductImageDTO;
import com.project.harmonie_e_commerce.model.Product;
import com.project.harmonie_e_commerce.model.ProductImage;
import com.project.harmonie_e_commerce.response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface IProductService {
    ProductResponse createProduct(ProductDTO productDTO) throws Exception;
    Product getProductById(int id) throws Exception;
    Page<ProductResponse> getAllProducts(PageRequest pageRequest);
    ProductResponse updateProduct(int id, ProductDTO productDTO) throws Exception;
    void deleteProduct(int id);
    boolean existsByName(String name);
    ProductImage createProductImage(ProductImageDTO productImageDTO) throws Exception;
    List<ProductImage> getProductImagesByProductId(int productId);
}
