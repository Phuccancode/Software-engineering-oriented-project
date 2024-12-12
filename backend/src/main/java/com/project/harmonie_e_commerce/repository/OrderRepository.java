package com.project.harmonie_e_commerce.repository;

import com.project.harmonie_e_commerce.model.Order;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>{
    @Query("SELECT O FROM Order O WHERE O.deliveryInformation.user.id = :user_id")
    List<Order> findByUserIdThroughConsigneeInfomation(@Param("user_id") Integer user_id);
}
