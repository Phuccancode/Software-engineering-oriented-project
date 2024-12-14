package com.project.harmonie_e_commerce.dto;

import com.project.harmonie_e_commerce.model.Product;
import com.project.harmonie_e_commerce.model.Box;


import lombok.Data;

@Data
public class OrderProductInBoxDTO {
    Box box;
    Product product;
    Integer quantity;
    
    public OrderProductInBoxDTO(Box box, Product product, Integer quantity) {
        this.box = box;
        this.product = product;
        this.quantity = quantity;
    }
}
