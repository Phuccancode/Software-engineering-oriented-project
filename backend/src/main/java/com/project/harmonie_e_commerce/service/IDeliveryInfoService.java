package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.DeliveryInformationDTO;
import com.project.harmonie_e_commerce.response.DIResponse;

import java.util.List;

public interface IDeliveryInfoService{

    DIResponse createDeliveryInfo(Integer userId, DeliveryInformationDTO deliveryInformationDTO);

    List<DIResponse> showAllDeliInfo(Integer userId);

    DIResponse updateDeliveryInfo(Integer userId, DeliveryInformationDTO deliveryInformationDTO) ;

    void deleteDeliInfo(Integer id);

    DIResponse getById(Integer id);

}
