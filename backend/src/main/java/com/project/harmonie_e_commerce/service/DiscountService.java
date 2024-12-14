package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.ShippingDiscountDTO;
import com.project.harmonie_e_commerce.dto.StoreDiscountDTO;
import com.project.harmonie_e_commerce.dto.SystemDiscountDTO;
import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.*;
import com.project.harmonie_e_commerce.repository.*;
import com.project.harmonie_e_commerce.response.ShippingDiscountRespone;
import com.project.harmonie_e_commerce.response.StoreDiscountRespone;
import com.project.harmonie_e_commerce.response.StringResponse;
import com.project.harmonie_e_commerce.response.SystemDiscountResponse;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class DiscountService implements IDiscountService{

    private final DiscountRepository discountRepository;

    private final SystemDiscountRepository systemDiscountRepository;

    private final ShippingDiscountRepository shippingDiscountRepository;

    private final StoreDiscountRepository storeDiscountRepository;

    private final StoreRepository storeRepository;

    @Override
    @Transactional
    public StoreDiscountRespone createStoreDiscount(Integer storeId, StoreDiscountDTO storeDiscountDTO) {
        Discount discount = createDiscount(
                storeDiscountDTO.getCode(),
                storeDiscountDTO.getQuantity(),
                storeDiscountDTO.getStart_date(),
                storeDiscountDTO.getExpiration_date()
        );

        Store store = storeRepository.findById(storeId).orElseThrow(
                () -> new DataNotFoundException("Store not found")
        );

        StoreDiscount storeDiscount = StoreDiscount.builder()
                .discount(discount)
                .store(store)
                .amount(storeDiscountDTO.getAmount())
                .build();

        storeDiscountRepository.save(storeDiscount);

        return StoreDiscountRespone.fromStoreDiscount(storeDiscount);
    }

    @Override
    @Transactional
    public ShippingDiscountRespone createShippingDiscount(ShippingDiscountDTO shippingDiscountDTO) {
        Discount discount = createDiscount(
                shippingDiscountDTO.getCode(),
                shippingDiscountDTO.getQuantity(),
                shippingDiscountDTO.getStart_date(),
                shippingDiscountDTO.getExpiration_date()
        );

        System.out.println(discount.getId());

        ShippingDiscount shippingDiscount = ShippingDiscount.builder()
                .discount(discount)
                .maxAmount(shippingDiscountDTO.getMax_amount())
                .build();
        shippingDiscountRepository.save(shippingDiscount);

        return ShippingDiscountRespone.fromShippingDiscount(shippingDiscount);
    }

    @Override
    @Transactional
    public SystemDiscountResponse createSystemDiscount(SystemDiscountDTO systemDiscountDTO) {
        Discount discount = createDiscount(
                systemDiscountDTO.getCode(),
                systemDiscountDTO.getQuantity(),
                systemDiscountDTO.getStart_date(),
                systemDiscountDTO.getExpiration_date()
        );

        SystemDiscount systemDiscount = SystemDiscount.builder()
                .id(discount.getId())
                .discount(discount)
                .maxAmount(systemDiscountDTO.getMax_amount())
                .percentage(systemDiscountDTO.getPercentage())
                .minBillAmount(systemDiscountDTO.getMin_bill_amt())
                .build();

        systemDiscountRepository.save(systemDiscount);

        return SystemDiscountResponse.fromSystemDiscount(systemDiscount);
    }

    Discount createDiscount(String code, Integer quantity, Date startDate, Date exDate){
        return discountRepository.save(
                Discount.builder()
                        .code(code)
                        .quantity(quantity)
                        .startDate(startDate)
                        .expirationDate(exDate)
                        .build()
        );
    }

    @Override
    public List<StoreDiscountRespone> getAllStoreDiscount(Integer storeId){

        Store store = storeRepository.findById(storeId).orElseThrow(
                () -> new DataNotFoundException("Store not found")
        );

        List<StoreDiscount> storeDiscountList = storeDiscountRepository.findAllByStore(store);

        List<StoreDiscountRespone> storeDiscountResponeList = new ArrayList<>();
        for (StoreDiscount storeDiscount: storeDiscountList){
            StoreDiscountRespone storeDiscountRespone = StoreDiscountRespone.fromStoreDiscount(storeDiscount);
            storeDiscountResponeList.add(storeDiscountRespone);
        }
        return storeDiscountResponeList;
    }

    @Override
    public List<SystemDiscountResponse> getAllSystemDiscount() {
        List<SystemDiscount> systemDiscountList = systemDiscountRepository.findAll();

        List<SystemDiscountResponse> systemDiscountResponseList = new ArrayList<>();
        for (SystemDiscount systemDiscount: systemDiscountList){
            SystemDiscountResponse systemDiscountResponse = SystemDiscountResponse.fromSystemDiscount(systemDiscount);
            systemDiscountResponseList.add(systemDiscountResponse);
        }
        return systemDiscountResponseList;
    }

    @Override
    public List<ShippingDiscountRespone> getAllShippingDiscount() {
        List<ShippingDiscount> shippingDiscountList = shippingDiscountRepository.findAll();

        List<ShippingDiscountRespone> shippingDiscountResponeList = new ArrayList<>();
        for (ShippingDiscount shippingDiscount:shippingDiscountList){
            ShippingDiscountRespone shippingDiscountRespone = ShippingDiscountRespone.fromShippingDiscount(shippingDiscount);
            shippingDiscountResponeList.add(shippingDiscountRespone);
        }
        return shippingDiscountResponeList;
    }

    @Override
    @Transactional
    public StoreDiscountRespone updateStoreDiscount(Integer id, StoreDiscountDTO dto) {
        StoreDiscount storeDiscount = storeDiscountRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Store discount khong ton tai voi id " +id)
        );
        Discount discount = storeDiscount.getDiscount();

        discount.setCode(dto.getCode());
        discount.setQuantity(dto.getQuantity());
        discount.setExpirationDate(dto.getExpiration_date());
        discount.setStartDate(dto.getStart_date());

        storeDiscount.setAmount(dto.getAmount());

        discountRepository.save(discount);
        storeDiscountRepository.save(storeDiscount);

        return StoreDiscountRespone.fromStoreDiscount(storeDiscount);
    }

    @Override
    @Transactional
    public StringResponse deleteStoreDiscount(Integer id) {
        StoreDiscount storeDiscount = storeDiscountRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Store discount khong ton tai voi id " +id)
        );
        Discount discount = storeDiscount.getDiscount();

        storeDiscountRepository.delete(storeDiscount);
        discountRepository.delete(discount);

        return new StringResponse("Xoa thanh cong");
    }
}
