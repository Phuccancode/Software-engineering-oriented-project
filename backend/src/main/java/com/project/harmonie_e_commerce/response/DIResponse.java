package com.project.harmonie_e_commerce.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.harmonie_e_commerce.model.DeliveryInformation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DIResponse {
    private Integer id;
    @JsonProperty("consignee_name")
    private String consigneeName;
    @JsonProperty("phone_number")
    private String phoneNumber;
    @JsonProperty("road_number")
    private String roadNumber;
    private String city;
    private String district;
    private String ward;


    public static DIResponse fromDeliveryInformation(DeliveryInformation deliveryInformation) {
        return DIResponse.builder()
                .id(deliveryInformation.getId())
                .consigneeName(deliveryInformation.getConsigneeName())
                .phoneNumber(deliveryInformation.getPhoneNumber())
                .roadNumber(deliveryInformation.getRoadNumber())
                .city(deliveryInformation.getCity())
                .district(deliveryInformation.getDistrict())
                .ward(deliveryInformation.getWard())
                .build();
    }
}