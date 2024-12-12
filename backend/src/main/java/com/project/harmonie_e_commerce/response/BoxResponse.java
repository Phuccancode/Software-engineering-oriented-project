package com.project.harmonie_e_commerce.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.harmonie_e_commerce.model.Box;
import com.project.harmonie_e_commerce.model.Box.BoxStatus;
import com.project.harmonie_e_commerce.repository.ProductInBoxRepository;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.time.LocalDate;
import java.sql.Timestamp;
import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoxResponse {
    @JsonProperty("store_discount")
    private StoreDiscountRespone storeDiscount;
    @JsonProperty("shipping_discount")
    private ShippingDiscountRespone shippingDiscount;
    private StoreResponse store;
    @JsonProperty("products")
    private List<ProductInBoxRespone> productInBoxList;

    @JsonProperty("fee_ship")
    private Float feeShip;
    @JsonProperty("total_price")
    private Float totalPrice;
    @JsonProperty("predicted_delivery_date")
    private LocalDate predictedDeliveryDate;
    @JsonProperty("shipper_name")
    private String shipperName;
    @JsonProperty("shipper_phone")
    private String shipperPhone;
    private String caution;
    @JsonProperty("packing_date")
    private Timestamp packingDate;
    private BoxStatus status;

    public static BoxResponse fromBox(Box box, ProductInBoxRepository productInBoxRepository) {

        return BoxResponse.builder()
                .storeDiscount(StoreDiscountRespone.fromStoreDiscount(box.getStoreDiscount()))
                .shippingDiscount(ShippingDiscountRespone.fromShippingDiscount(box.getShippingDiscount()))
                .store(StoreResponse.fromStore(box.getStore()))
                .productInBoxList(ProductInBoxRespone.fromProductInBoxList(productInBoxRepository.findByBox(box)))
                .shipperName(box.getShipperName())
                .shipperPhone(box.getShipperPhone())
                .totalPrice(box.getTotalPrice())
                .feeShip(box.getFeeShip())
                .predictedDeliveryDate(box.getPredictedDeliveryDate())
                .caution(box.getCaution())
                .packingDate(box.getPackingDate())
                .status(box.getStatus())
                .build();
    }

    public static List<BoxResponse> fromBoxList(List<Box> boxList, ProductInBoxRepository productInBoxRepository) {
        List<BoxResponse> boxResponseList = new ArrayList<>();

        for(Box box : boxList) {
            boxResponseList.add(BoxResponse.fromBox(box, productInBoxRepository));
        }

        return boxResponseList;
    }

}