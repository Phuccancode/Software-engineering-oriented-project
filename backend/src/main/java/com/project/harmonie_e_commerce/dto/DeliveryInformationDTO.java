package com.project.harmonie_e_commerce.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class DeliveryInformationDTO {
    @JsonProperty("consignee_name")
    private String consigneeName;
    @JsonProperty("phone_number")
    private String phoneNumber;
    @JsonProperty("road_number")
    private String roadNumber;
    private String ward;
    private String district;
    private String city;
}
