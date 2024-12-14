package com.project.harmonie_e_commerce.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.harmonie_e_commerce.model.ShippingDiscount;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShippingDiscountRespone {
    @JsonProperty("id")
    private Integer id;
    private String code;
    private Integer quantity;
    @JsonProperty("release_date")
    private Timestamp releaseDate;
    @JsonProperty("start_date")
    private Date startDate;
    @JsonProperty("expiration_date")
    private Date expirationDate;
    @JsonProperty("max_amount")
    private Float maxAmount;


    static public ShippingDiscountRespone fromShippingDiscount(ShippingDiscount shippingDiscount) {
        return shippingDiscount == null ? null :
            ShippingDiscountRespone.builder()
                .id(shippingDiscount.getId())
                .code(shippingDiscount.getDiscount().getCode())
                .quantity(shippingDiscount.getDiscount().getQuantity())
                .releaseDate(shippingDiscount.getDiscount().getReleaseDate())
                .startDate(shippingDiscount.getDiscount().getStartDate())
                .expirationDate(shippingDiscount.getDiscount().getExpirationDate())
                .maxAmount(shippingDiscount.getMaxAmount())
                .build();
    }

}