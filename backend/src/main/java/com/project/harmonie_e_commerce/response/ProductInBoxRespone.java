package com.project.harmonie_e_commerce.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import com.project.harmonie_e_commerce.model.ProductInBox;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductInBoxRespone {
    @JsonProperty("id")
    private Integer id;
    @JsonProperty("buy_quantity")
    private Integer quantity;
    @JsonProperty("product_response")
    private ProductResponse productResponse;
    @JsonProperty("total_price")
    private Float totalPrice;


    static public ProductInBoxRespone fromProductInBox(ProductInBox productInBox) {
        return ProductInBoxRespone.builder()
                .id(productInBox.getId())
                .quantity(productInBox.getQuantity())
                .productResponse(ProductResponse.fromProduct(productInBox.getProduct()))
                .totalPrice(productInBox.getTotalPrice())
                .build();
    }

    static public List<ProductInBoxRespone> fromProductInBoxList(List<ProductInBox> productInBoxList) {

        List<ProductInBoxRespone> productInBoxResponeList = new java.util.ArrayList<>();
        for (ProductInBox productInBox : productInBoxList) {
            productInBoxResponeList.add(ProductInBoxRespone.fromProductInBox(productInBox));
        }

        return productInBoxResponeList;
    }
}
