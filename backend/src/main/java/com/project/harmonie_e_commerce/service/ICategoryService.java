package com.project.harmonie_e_commerce.service;


import com.project.harmonie_e_commerce.dto.CategoryDTO;
import com.project.harmonie_e_commerce.model.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> getAllCategories();
    Category getCategoryById(Integer id);
    Category createCategory(CategoryDTO categoryDTO);
    Category updateCategory(Integer id, CategoryDTO categoryDTO);
    void deleteCategory(Integer id);
}
