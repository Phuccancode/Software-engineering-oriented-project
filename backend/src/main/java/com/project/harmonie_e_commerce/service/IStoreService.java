package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.StoreDTO;
// import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.Store;
import com.project.harmonie_e_commerce.response.*;

import java.util.List;

public interface IStoreService{
    Store addNewStore(StoreDTO storeDTO, Integer userId) ;

    List<ProductResponse> showAllProductInStore(Integer storeId) ;

    List<BoxResponse> showAllBoxInStore(Integer storeId) ;

    List<StoreDiscountRespone> showAllStoreDiscountInStore(Integer storeId);

    StatisticResponse getStatisticOfStore(Integer storeId, Integer day, Integer month, Integer year) ;

    List<Store> getAllStore();

    Store updateStore(StoreDTO storeDTO,Integer store_id);

    StringResponse deleteStore(Integer store_id,String password);

    Store getInfo(Integer store_id);

}
