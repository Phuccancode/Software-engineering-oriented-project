package com.project.harmonie_e_commerce.response;

import com.project.harmonie_e_commerce.model.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewResponse {
    private Integer id;
    private Integer rating;
    private String text;
    private Timestamp time;

    public static ReviewResponse fromReview(Review review){
        return ReviewResponse.builder()
                .id(review.getId())
                .rating(review.getRating())
                .text(review.getText())
                .time(review.getTime())
                .build();
    }
}
