package com.project.harmonie_e_commerce.repository;

import com.project.harmonie_e_commerce.model.SystemDiscount;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import java.util.Optional;

@Repository
public interface SystemDiscountRepository extends JpaRepository<SystemDiscount, Integer> {
    Optional<SystemDiscount> findById(Integer id);
    List<SystemDiscount> findAll();
    void deleteById(Integer id);
    void deleteAll();
}
