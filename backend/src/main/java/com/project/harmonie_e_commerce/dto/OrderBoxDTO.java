package com.project.harmonie_e_commerce.dto;

import com.project.harmonie_e_commerce.model.Order;
import com.project.harmonie_e_commerce.model.Store;
import com.project.harmonie_e_commerce.model.ShippingDiscount;
import com.project.harmonie_e_commerce.model.StoreDiscount;
import com.project.harmonie_e_commerce.model.Product;

import java.util.List;
import com.project.harmonie_e_commerce._lib.Pair;


import lombok.Data;

@Data
public class OrderBoxDTO {

    Order order;
    Store store;
    StoreDiscount storeDiscount;
    ShippingDiscount shippingDiscount;
    String caution;
    List<Pair<Product, Integer>> products;

    public OrderBoxDTO(
        Order order, 
        Store store, 
        StoreDiscount storeDiscount, 
        ShippingDiscount shippingDiscount, 
        String caution, 
        List<Pair<Product, Integer>> products) {
        this.order = order;
        this.store = store;
        this.storeDiscount = storeDiscount;
        this.shippingDiscount = shippingDiscount;
        this.caution = caution;
        this.products = products;
    }
}
