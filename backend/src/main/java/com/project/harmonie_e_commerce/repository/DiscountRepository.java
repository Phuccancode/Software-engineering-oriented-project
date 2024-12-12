package com.project.harmonie_e_commerce.repository;

import com.project.harmonie_e_commerce.model.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountRepository extends JpaRepository<Discount, Integer> {
}
