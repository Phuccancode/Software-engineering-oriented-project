package com.project.harmonie_e_commerce.repository;

import com.project.harmonie_e_commerce.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
