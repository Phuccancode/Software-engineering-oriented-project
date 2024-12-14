package com.project.harmonie_e_commerce.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Data
public class ProductListResponse {
    private List<ProductResponse> products;
    private Integer totalPages;
}
