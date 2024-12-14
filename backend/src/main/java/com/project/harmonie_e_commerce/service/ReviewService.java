package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.ReviewDTO;
import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.Product;
import com.project.harmonie_e_commerce.model.Review;
import com.project.harmonie_e_commerce.model.User;
import com.project.harmonie_e_commerce.repository.ProductRepository;
import com.project.harmonie_e_commerce.repository.ReviewRepository;
import com.project.harmonie_e_commerce.repository.UserRepository;
import com.project.harmonie_e_commerce.response.ReviewResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ReviewService implements IReviewService{

    private final ReviewRepository reviewRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    @Override
    public ReviewResponse createReview(ReviewDTO reviewDTO, Integer user_id, Integer product_id) {
        Product product = productRepository.findById(product_id).orElseThrow(
                () -> new DataNotFoundException("Product not found by id " + product_id)
        );
        User user = userRepository.findById(user_id).orElseThrow(
                () -> new DataNotFoundException("User not found by id " + user_id)
        );

        Review review = Review.builder()
                .text(reviewDTO.getText())
                .rating(reviewDTO.getRating())
                .product(product)
                .user(user)
                .build();

        Review res = reviewRepository.save(review);

        return ReviewResponse.fromReview(res);
    }

    @Override
    public String deleteReview(Integer review_id) {
        Review review = reviewRepository.findById(review_id).orElseThrow(
                () -> new DataNotFoundException("Review not found by id " + review_id)
        );
        reviewRepository.delete(review);
        return "Delete Successfully";
    }

    @Override
    public List<ReviewResponse> getAllReviewOfProduct(Integer product_id) {
        Product product = productRepository.findById(product_id).orElseThrow(
                () -> new DataNotFoundException("Product not found by id " + product_id)
        );
        List<Review> reviewList = reviewRepository.findAllByProductId(product_id);
        List<ReviewResponse> responseList = new ArrayList<>();
        for (Review review: reviewList){
            responseList.add(ReviewResponse.fromReview(review));
        }
        return responseList;
    }
}
