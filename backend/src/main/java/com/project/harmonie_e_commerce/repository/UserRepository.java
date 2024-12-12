package com.project.harmonie_e_commerce.repository;

import com.project.harmonie_e_commerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndCodeVerify(String username, String codeVerify);
}
