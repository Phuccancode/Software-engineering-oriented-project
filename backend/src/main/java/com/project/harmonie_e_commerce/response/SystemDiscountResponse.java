package com.project.harmonie_e_commerce.response;

import com.project.harmonie_e_commerce.model.SystemDiscount;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SystemDiscountResponse {
    String code;
    Integer quantity;
    @JsonProperty("release_date")
    Timestamp releaseDate;
    @JsonProperty("start_date")
    Date startDate;
    @JsonProperty("expiration_date")
    Date expirationDate;
    @JsonProperty("max_amount")
    Float maxAmount;
    Integer percentage;
    @JsonProperty("min_bill_amount")
    Float minBillAmount;


    public static SystemDiscountResponse fromSystemDiscount(SystemDiscount systemDiscount) {
        return systemDiscount == null ? null :
                SystemDiscountResponse.builder()
                .code(systemDiscount.getDiscount().getCode())
                .quantity(systemDiscount.getDiscount().getQuantity())
                .releaseDate(systemDiscount.getDiscount().getReleaseDate())
                .startDate(systemDiscount.getDiscount().getStartDate())
                .expirationDate(systemDiscount.getDiscount().getExpirationDate())
                .maxAmount(systemDiscount.getMaxAmount())
                .percentage(systemDiscount.getPercentage())
                .minBillAmount(systemDiscount.getMinBillAmount())
                .build();
    }
}