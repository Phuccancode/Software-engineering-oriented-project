package com.project.harmonie_e_commerce.repository;

import com.project.harmonie_e_commerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
