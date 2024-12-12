 package com.project.harmonie_e_commerce.controller;


 import com.project.harmonie_e_commerce.dto.CategoryDTO;
 import com.project.harmonie_e_commerce.exception.DataNotFoundException;
 import com.project.harmonie_e_commerce.model.Category;
 import com.project.harmonie_e_commerce.service.CategoryService;
 import jakarta.validation.Valid;
 import lombok.RequiredArgsConstructor;
 import org.springframework.http.ResponseEntity;
 import org.springframework.validation.BindingResult;
 import org.springframework.validation.FieldError;
 import org.springframework.web.bind.annotation.*;

 import java.util.List;

 @RestController
 @RequestMapping("${api.prefix}/categories")
 @RequiredArgsConstructor
 public class CategoryController {
     private final CategoryService categoryService;

     @PostMapping("")
     public ResponseEntity<?> createCategory(@Valid @RequestBody CategoryDTO categoryDTO,
                                             BindingResult result) {
         if (result.hasErrors()) {
             List<String> errorMessages = result.getFieldErrors()
                     .stream()
                     .map(FieldError::getDefaultMessage)
                     .toList();
             return ResponseEntity.badRequest().body(errorMessages);
         }
         Category newCategory = categoryService.createCategory(categoryDTO);
         return ResponseEntity.ok(newCategory);
     }

     @GetMapping("")
     public ResponseEntity<?> getAllCategories() {
         try {
             List<Category> categories = categoryService.getAllCategories();
             return ResponseEntity.ok(categories);
         } catch (DataNotFoundException e) {
             throw new RuntimeException(e);
         }
     }

     @GetMapping("/{id}")
     public ResponseEntity<?> getCategoryById(@PathVariable Integer id) {
         try {
             Category existingCategory = categoryService.getCategoryById(id);
             return ResponseEntity.ok(existingCategory);
         } catch (Exception e) {
             return ResponseEntity.badRequest().body(e.getMessage());
         }

     }

     @PutMapping("/{id}")
     public ResponseEntity<?> updateCategory(@PathVariable Integer id, @Valid @RequestBody CategoryDTO categoryDTO) {
         try {
             return ResponseEntity.ok(categoryService.updateCategory(id, categoryDTO));
         } catch (Exception e) {
             return ResponseEntity.badRequest().body(e.getMessage());
         }
     }

     @DeleteMapping("/{id}")
     public ResponseEntity<?> deleteCategory(@PathVariable Integer id) {
         categoryService.deleteCategory(id);
         return ResponseEntity.ok("Category deleted successfully");
     }
 }

