package com.project.harmonie_e_commerce.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.harmonie_e_commerce.model.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResponse {
    private Integer id;

    @JsonProperty("store_id")
    private Integer storeId;

    private String name;
    private String brand;
    private Float price;
    private Integer quantity;

    @JsonProperty("buying_count")
    private Integer buyingCount;

    private String description;

    @JsonProperty("rating_count")
    private Integer ratingCount;

    @JsonProperty("avg_rating")
    private Float avgRating;

    @JsonProperty("status")
    private String productStatus;

    @JsonProperty("category_id")
    private Integer categoryId;

    public static ProductResponse fromProduct(Product product) {
        return ProductResponse.builder()
            .id(product.getId())
            .storeId(product.getStore().getId())
            .name(product.getName())
            .brand(product.getBrand())
            .price(product.getPrice())
            .quantity(product.getQuantity())
            .buyingCount(product.getBuyingCount())
            .description(product.getDescription())
            .ratingCount(product.getRatingCount())
            .avgRating(product.getAvgRating())
            .productStatus(product.getProductStatus().name())
            .categoryId(product.getCategory().getId())
            .build();
    }
}