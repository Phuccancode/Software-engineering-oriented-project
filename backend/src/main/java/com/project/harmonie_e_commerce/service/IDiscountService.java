package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.ShippingDiscountDTO;
import com.project.harmonie_e_commerce.dto.StoreDiscountDTO;
import com.project.harmonie_e_commerce.dto.SystemDiscountDTO;
import com.project.harmonie_e_commerce.response.ShippingDiscountRespone;
import com.project.harmonie_e_commerce.response.StoreDiscountRespone;
import com.project.harmonie_e_commerce.response.StringResponse;
import com.project.harmonie_e_commerce.response.SystemDiscountResponse;

import java.util.List;

public interface IDiscountService {
    StoreDiscountRespone createStoreDiscount(Integer storeId, StoreDiscountDTO storeDiscountDTO) ;

    ShippingDiscountRespone createShippingDiscount(ShippingDiscountDTO shippingDiscountDTO);

    SystemDiscountResponse createSystemDiscount(SystemDiscountDTO systemDiscountDTO) ;

    List<StoreDiscountRespone> getAllStoreDiscount(Integer storeId) ;

    List<SystemDiscountResponse> getAllSystemDiscount();

    List<ShippingDiscountRespone> getAllShippingDiscount();

    StoreDiscountRespone updateStoreDiscount(Integer id, StoreDiscountDTO dto);

    StringResponse deleteStoreDiscount(Integer id);
}
