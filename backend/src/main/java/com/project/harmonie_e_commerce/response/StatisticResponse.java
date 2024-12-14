package com.project.harmonie_e_commerce.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StatisticResponse {
    @JsonProperty("total_price")
    private Float totalPrice;
    private LocalDate date;
    private Integer nb_of_boxes;
}
