package com.project.harmonie_e_commerce.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductInCartResponse {
    private Integer id;
    private Integer quantity;
    private String name;
    private String brand;
    private Float price;
    private String categoryName;
    private Integer store_id;
    private String store_name;
    private String productUrl;
}
