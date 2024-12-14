package com.project.harmonie_e_commerce.repository;

import com.project.harmonie_e_commerce.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findAllByProductId(Integer product_id);
}
