package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.DeliveryInformationDTO;
import com.project.harmonie_e_commerce.response.DIResponse;

import java.util.List;

public interface IDeliveryInfoService{

    DIResponse createDeliveryInfo(Integer userId, DeliveryInformationDTO deliveryInformationDTO) throws Exception;

    List<DIResponse> showAllDeliInfo(Integer userId) throws Exception;

    DIResponse updateDeliveryInfo(Integer userId, DeliveryInformationDTO deliveryInformationDTO) throws Exception;

    void deleteDeliInfo(Integer id) throws Exception;

    DIResponse getById(Integer id) throws Exception;

}
