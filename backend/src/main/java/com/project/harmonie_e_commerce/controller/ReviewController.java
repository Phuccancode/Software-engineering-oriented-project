package com.project.harmonie_e_commerce.controller;

import com.project.harmonie_e_commerce.dto.ReviewDTO;
import com.project.harmonie_e_commerce.service.ReviewService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/review")
@AllArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/create/{user_id}/{product_id}")
    public ResponseEntity<?> createReview(
            @RequestBody ReviewDTO reviewDTO,
            @PathVariable Integer user_id,
            @PathVariable Integer product_id
    ){
        return new ResponseEntity<>(reviewService.createReview(reviewDTO,user_id,product_id), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{review_id}")
    public ResponseEntity<?> deleteReview(
            @PathVariable Integer review_id
    ){
        return ResponseEntity.ok(reviewService.deleteReview(review_id));
    }

    @GetMapping("/all/{product_id}")
    public ResponseEntity<?> getAllReviewOfProduct(
            @PathVariable Integer product_id
    ){
        return ResponseEntity.ok(reviewService.getAllReviewOfProduct(product_id));
    }

}
