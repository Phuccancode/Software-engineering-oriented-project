package com.project.harmonie_e_commerce.repository;

import com.project.harmonie_e_commerce.model.Product;
import com.project.harmonie_e_commerce.model.Store;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    Optional<Product> findById(Integer id);
    Page<Product> findAll(Pageable pageable);

    @Query("SELECT P.store FROM Product P WHERE P.id = :productId")
    Optional<Store> findStoreByProductId(@Param("productId") Integer productId);

    boolean existsByName(String name);

    List<Product> findAllByStore(Store store);

    List<Product> findAllByCategoryId(Integer category_id);

}
