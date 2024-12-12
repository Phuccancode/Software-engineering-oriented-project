package com.project.harmonie_e_commerce.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProductDTO {
    @JsonProperty("store_id")
    private Integer storeId;

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 200, message = "Title must be between 3 and 200 characters")
    private String name;

    private String brand;

    @Min(value = 0, message = "Price must be greater or equal than 0")
    @Max(value = 10000000, message = "Price must be less or equal than 10000000")
    private Float price;

    private Integer quantity;

    private String description;

    @JsonProperty("buying_count")
    private Integer buyingCount;

    @JsonProperty("rating_count")
    private Integer ratingCount;

    @JsonProperty("avg_rating")
    private Float avgRating;

    @JsonProperty("category_id")
    private Integer categoryId;

    @JsonProperty("status")
    private String status;
}