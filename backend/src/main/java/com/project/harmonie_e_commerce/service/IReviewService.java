package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.ReviewDTO;
import com.project.harmonie_e_commerce.response.ReviewResponse;

import java.util.List;

public interface IReviewService {
    ReviewResponse createReview(ReviewDTO reviewDTO, Integer user_id, Integer product_id);

    String deleteReview(Integer review_id);

    List<ReviewResponse> getAllReviewOfProduct(Integer product_id);

}
