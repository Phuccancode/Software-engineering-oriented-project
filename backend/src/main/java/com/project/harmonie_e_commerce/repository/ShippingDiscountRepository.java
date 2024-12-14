package com.project.harmonie_e_commerce.repository;

import com.project.harmonie_e_commerce.model.ShippingDiscount;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import java.util.Optional;

@Repository
public interface ShippingDiscountRepository extends JpaRepository<ShippingDiscount, Integer> {
    Optional<ShippingDiscount> findById(Integer id);
    List<ShippingDiscount> findAll();
    void deleteById(Integer id);
    void deleteAll();
}
