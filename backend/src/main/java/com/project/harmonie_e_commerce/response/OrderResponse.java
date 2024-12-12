package com.project.harmonie_e_commerce.response;

import com.project.harmonie_e_commerce.model.Order.PayMethod;
import com.project.harmonie_e_commerce.repository.BoxRepository;
import com.project.harmonie_e_commerce.repository.ProductInBoxRepository;
import com.project.harmonie_e_commerce.model.Order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {
    @JsonProperty("order_id")
    private Integer orderId;
    @JsonProperty("created_date")
    private Timestamp createdDate;
    @JsonProperty("total_price")
    private Float totalPrice;
    @JsonProperty("pay_method")
    private PayMethod payMethod;
    @JsonProperty("delivery_information")
    private DeliveryInformationResponse deliveryInformation;
    @JsonProperty("system_discount")
    private SystemDiscountResponse systemDiscount;
    @JsonProperty("boxes")
    private List<BoxResponse> boxList;


    public static OrderResponse fromOrder(Order order, BoxRepository boxRepository, ProductInBoxRepository productInBoxRepository) {

        return OrderResponse.builder()
            .orderId(order.getId())
            .createdDate(order.getCreationDate())
            .totalPrice(order.getTotalPrice())
            .payMethod(order.getPayMethod())
            .deliveryInformation(DeliveryInformationResponse.fromDeliveryInformation(order.getDeliveryInformation()))
            .systemDiscount(SystemDiscountResponse.fromSystemDiscount(order.getSystemDiscount()))
            .boxList(BoxResponse.fromBoxList(boxRepository.findByOrder(order), productInBoxRepository))
            .build();
    }
}