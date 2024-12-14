package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.DeliveryInformationDTO;
import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.DeliveryInformation;
import com.project.harmonie_e_commerce.model.User;
import com.project.harmonie_e_commerce.repository.DeliveryInformationRepository;
import com.project.harmonie_e_commerce.repository.UserRepository;
import com.project.harmonie_e_commerce.response.DIResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class DeliveryInfoService implements IDeliveryInfoService{

    private final DeliveryInformationRepository deliveryInformationRepository;

    private final UserRepository userRepository;

    @Override
    public DIResponse createDeliveryInfo(Integer userId, DeliveryInformationDTO dto){
        User user = userRepository.findById(userId).orElseThrow(
                () -> new DataNotFoundException("User not found")
        );

        DeliveryInformation deliveryInformation = DeliveryInformation.builder()
                .city(dto.getCity())
                .district(dto.getDistrict())
                .ward(dto.getWard())
                .consigneeName(dto.getConsigneeName())
                .phoneNumber(dto.getPhoneNumber())
                .roadNumber(dto.getRoadNumber())
                .user(user)
                .build();

        deliveryInformationRepository.save(deliveryInformation);
        return DIResponse.fromDeliveryInformation(deliveryInformation);
    }

    @Override
    public List<DIResponse> showAllDeliInfo(Integer userId){
        User user = userRepository.findById(userId).orElseThrow(
                () -> new DataNotFoundException("User not found")
        );

        List<DeliveryInformation> informationList = deliveryInformationRepository.findAllByUser(user);

        List<DIResponse> responses = new ArrayList<>();

        for (DeliveryInformation d: informationList){
            DIResponse res = DIResponse.fromDeliveryInformation(d);
            responses.add(res);
        }

        return responses;
    }

    @Override
    public DIResponse updateDeliveryInfo(Integer id, DeliveryInformationDTO dto){
        DeliveryInformation deliveryInformation = deliveryInformationRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found Delivery Information")
        );

        deliveryInformation.setCity(dto.getCity());
        deliveryInformation.setDistrict(dto.getDistrict());
        deliveryInformation.setWard(dto.getWard());
        deliveryInformation.setRoadNumber(dto.getRoadNumber());
        deliveryInformation.setPhoneNumber(dto.getPhoneNumber());
        deliveryInformation.setConsigneeName(dto.getConsigneeName());

        deliveryInformationRepository.save(deliveryInformation);

        return DIResponse.fromDeliveryInformation(deliveryInformation);
    }

    @Override
    public void deleteDeliInfo(Integer id) {
        DeliveryInformation deliveryInformation = deliveryInformationRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found Delivery Information")
        );

        deliveryInformationRepository.delete(deliveryInformation);
    }

    @Override
    public DIResponse getById(Integer id){
        return DIResponse.fromDeliveryInformation(deliveryInformationRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found Delivery Information")
        ));
    }
}
