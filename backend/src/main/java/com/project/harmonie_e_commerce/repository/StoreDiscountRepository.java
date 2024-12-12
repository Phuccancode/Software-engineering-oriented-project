package com.project.harmonie_e_commerce.repository;

import com.project.harmonie_e_commerce.model.Store;
import com.project.harmonie_e_commerce.model.StoreDiscount;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import java.util.Optional;

@Repository
public interface StoreDiscountRepository extends JpaRepository<StoreDiscount, Integer> {
    Optional<StoreDiscount> findById(Integer id);
    List<StoreDiscount> findAll();
    void deleteById(Integer id);
    void deleteAll();

    List<StoreDiscount> findAllByStore(Store store);
}
