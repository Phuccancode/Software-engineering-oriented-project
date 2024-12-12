package com.project.harmonie_e_commerce.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;


@Data
@Builder
public class OrderProductDTO {

    @JsonProperty("product_id")
    Integer id;

    @JsonProperty("quantity")
    Integer quantity;
}
