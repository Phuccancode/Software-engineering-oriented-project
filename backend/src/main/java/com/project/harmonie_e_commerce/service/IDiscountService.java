package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.ShippingDiscountDTO;
import com.project.harmonie_e_commerce.dto.StoreDiscountDTO;
import com.project.harmonie_e_commerce.dto.SystemDiscountDTO;
import com.project.harmonie_e_commerce.response.ShippingDiscountRespone;
import com.project.harmonie_e_commerce.response.StoreDiscountRespone;
import com.project.harmonie_e_commerce.response.SystemDiscountResponse;

import java.util.List;

public interface IDiscountService {
    StoreDiscountRespone createStoreDiscount(Integer storeId, StoreDiscountDTO storeDiscountDTO) throws Exception;

    ShippingDiscountRespone createShippingDiscount(ShippingDiscountDTO shippingDiscountDTO) throws Exception;

    SystemDiscountResponse createSystemDiscount(SystemDiscountDTO systemDiscountDTO) throws Exception;

    List<StoreDiscountRespone> getAllStoreDiscount(Integer storeId) throws Exception;

    List<SystemDiscountResponse> getAllSystemDiscount();

    List<ShippingDiscountRespone> getAllShippingDiscount();
}
