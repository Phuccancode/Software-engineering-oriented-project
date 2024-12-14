package com.project.harmonie_e_commerce.dto;

import java.util.List;

import com.project.harmonie_e_commerce.model.Order.PayMethod;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;



// {
//     "consignee_information_id": 5,
//     "system_discount_id": 4,
//     "pay_method": "credit",
//     "products": [
//       {
//         "id": 89,
//         "quantity": 2
//       },
//       {
//         "id": 4,
//         "quantity": 1
//       },
//       ...
//     ],
//     "store_discounts_ids": [ 34, 3, ... ],
//     "shipping_discounts_id": 2
// }



@Data
@Builder
public class OrderDTO {
    
    @JsonProperty("consignee_information_id")
    private Integer consigneeInformationId;

    @JsonProperty("system_discount_id")
    private Integer systemDiscountId;

    @JsonProperty("pay_method")
    private PayMethod payMethod;

    @JsonProperty("products")
    private List<OrderProductDTO> products;

    @JsonProperty("store_discounts_ids")
    private List<Integer> storeDiscountsIds;

    @JsonProperty("shipping_discounts_id")
    private Integer shippingDiscountId;
}
