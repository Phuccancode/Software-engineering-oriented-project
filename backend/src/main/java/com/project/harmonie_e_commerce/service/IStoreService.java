package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.StoreDTO;
// import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.Store;
import com.project.harmonie_e_commerce.response.BoxResponse;
import com.project.harmonie_e_commerce.response.ProductResponse;
import com.project.harmonie_e_commerce.response.StatisticResponse;
import com.project.harmonie_e_commerce.response.StoreDiscountRespone;

import java.util.List;

public interface IStoreService{
    Store addNewStore(StoreDTO storeDTO, Integer userId) throws Exception;

    List<ProductResponse> showAllProductInStore(Integer storeId) throws Exception;

    List<BoxResponse> showAllBoxInStore(Integer storeId) throws Exception;

    List<StoreDiscountRespone> showAllStoreDiscountInStore(Integer storeId) throws Exception;

    StatisticResponse getStatisticOfStore(Integer storeId) throws Exception;

}
