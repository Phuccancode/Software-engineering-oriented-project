package com.project.harmonie_e_commerce.repository;


import com.project.harmonie_e_commerce.model.ProductInBox;
import com.project.harmonie_e_commerce.model.Box;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface ProductInBoxRepository extends JpaRepository<ProductInBox, Integer> {

    Optional<ProductInBox> findById(Integer id);
    List<ProductInBox> findByBox(Box box);
  
    @Query("SELECT SUM(P.totalPrice) FROM ProductInBox P WHERE P.box = :box")
    Float findSumPriceByBox(@Param("box") Box box);
}

