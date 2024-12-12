package com.project.harmonie_e_commerce.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.harmonie_e_commerce.model.StoreDiscount;

// import com.project.harmonie_e_commerce.model.Store;

import java.sql.Timestamp;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StoreDiscountRespone {
    String code;
    Integer quantity;
    @JsonProperty("release_date")
    Timestamp releaseDate;
    @JsonProperty("start_date")
    Date startDate;
    @JsonProperty("expiration_date")
    Date expirationDate;
    Float amount;


    static public StoreDiscountRespone fromStoreDiscount(StoreDiscount storeDiscount){
        return storeDiscount == null ? null :
            StoreDiscountRespone.builder()
                .code(storeDiscount.getDiscount().getCode())
                .quantity(storeDiscount.getDiscount().getQuantity())
                .releaseDate(storeDiscount.getDiscount().getReleaseDate())
                .startDate(storeDiscount.getDiscount().getStartDate())
                .expirationDate(storeDiscount.getDiscount().getExpirationDate())
                .amount(storeDiscount.getAmount())
                .build();
    }
}