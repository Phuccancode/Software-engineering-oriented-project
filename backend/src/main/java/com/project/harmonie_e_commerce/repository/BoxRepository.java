package com.project.harmonie_e_commerce.repository;


import com.project.harmonie_e_commerce.model.Box;
import com.project.harmonie_e_commerce.model.Order;

import com.project.harmonie_e_commerce.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface BoxRepository extends JpaRepository<Box, Integer> {

    Optional<Box> findById(Integer id);

    List<Box> findByOrder(Order order);

    List<Box> findAllByStore(Store store);

    @Query("SELECT SUM(B.totalPrice) FROM Box B WHERE B.order = :order")
    Float findSumPriceByOrder(@Param("order") Order order);
}

