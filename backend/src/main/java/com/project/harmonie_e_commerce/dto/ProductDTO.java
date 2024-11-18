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
    @NotBlank(message = "Title is required")
    @Size(min = 3, max=200, message = "Title must be between 3 and 200 characters")
    private String name;
    @Min(value =0, message ="Price must be greater or equal than 0")
    @Max(value = 10000000, message = "Price must be less or equal than 10000000")
    private Float price;
    private String description;
    private String brand;
    private Long quantity;
    @JsonProperty("store_id")
    private Long storeId;
    @JsonProperty("category_id")
    private Long categoryId;
}