package com.project.harmonie_e_commerce.repository;

import com.project.harmonie_e_commerce.model.DeliveryInformation;

import com.project.harmonie_e_commerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface DeliveryInformationRepository extends JpaRepository<DeliveryInformation, Integer> {

    Optional<DeliveryInformation> findById(Integer id);

    List<DeliveryInformation> findAllByUser(User user);
}
