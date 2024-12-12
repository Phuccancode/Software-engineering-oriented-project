package com.project.harmonie_e_commerce.repository;

import com.project.harmonie_e_commerce.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {
   List<ProductImage> findByProductId(Integer productId);
}
