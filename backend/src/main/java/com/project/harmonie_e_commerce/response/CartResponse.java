package com.project.harmonie_e_commerce.response;

import com.project.harmonie_e_commerce.model.ProductInCart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartResponse {
    private Integer total_items;
    private List<ProductInCartResponse> productInCartList;


    static public CartResponse fromProductInCart(List<ProductInCart> productInCartList) {
        // return CartResponse.builder()
        //         .total_items(productInCartList.size())
        //         .productInCartList(ProductInCartResponse.fromProductInCartList(productInCartList))
        //         .build();
        return null;
    }
}
