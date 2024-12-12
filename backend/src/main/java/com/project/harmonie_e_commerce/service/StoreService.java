package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.StoreDTO;
import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.*;
import com.project.harmonie_e_commerce.repository.*;
import com.project.harmonie_e_commerce.response.BoxResponse;
import com.project.harmonie_e_commerce.response.ProductResponse;
import com.project.harmonie_e_commerce.response.StatisticResponse;
import com.project.harmonie_e_commerce.response.StoreDiscountRespone;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class StoreService implements IStoreService {

    private final StoreRepository storeRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final BoxRepository boxRepository;
    private final StoreDiscountRepository storeDiscountRepository;
    private final ProductInBoxRepository productInBoxRepository;

    @Override
    public Store addNewStore(StoreDTO storeDTO, Integer userId) throws Exception {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new DataNotFoundException("User not found")
        );

        System.out.println(userId);

//        return new Store();

        return storeRepository.save(
                Store.builder()
                        .id(userId)
//                        .user(user)
                        .address(storeDTO.getAddress())
                        .name(storeDTO.getName())
                        .description(storeDTO.getDescription())
                        .tax_id(storeDTO.getTax_id())
                        .build()
        );
    }

    @Override
    public List<ProductResponse> showAllProductInStore(Integer storeId) throws Exception {
        List<ProductResponse> productResponseList = new ArrayList<>();
        Store store = storeRepository.findById(storeId).orElseThrow(
                () -> new DataNotFoundException("Store not found")
        );
        List<Product> productList = productRepository.findAllByStore(store);

        for (Product product: productList){
            if (product.getProductStatus().equals(Product.ProductStatus.enable)){
                ProductResponse productResponse = ProductResponse.fromProduct(product);
                productResponseList.add(productResponse);
            }
        }

        return productResponseList;
    }

    @Override
    public List<BoxResponse> showAllBoxInStore(Integer storeId) throws Exception {
        List<BoxResponse> boxResponseList = new ArrayList<>();

        Store store = storeRepository.findById(storeId).orElseThrow(
                () -> new DataNotFoundException("Store not found")
        );

        List<Box> boxList = boxRepository.findAllByStore(store);

        for(Box box:boxList){
            BoxResponse boxResponse = BoxResponse.fromBox(box, productInBoxRepository);
            boxResponseList.add(boxResponse);
        }

        return boxResponseList;
    }

    @Override
    public List<StoreDiscountRespone> showAllStoreDiscountInStore(Integer storeId) throws Exception {
        List<StoreDiscountRespone> storeDiscountResponeList = new ArrayList<>();

        Store store = storeRepository.findById(storeId).orElseThrow(
                () -> new DataNotFoundException("Store not found")
        );

        List<StoreDiscount> storeDiscountList = storeDiscountRepository.findAllByStore(store);

        for (StoreDiscount storeDiscount: storeDiscountList){
            StoreDiscountRespone storeDiscountRespone = StoreDiscountRespone.fromStoreDiscount(storeDiscount);
            storeDiscountResponeList.add(storeDiscountRespone);
        }
        return storeDiscountResponeList;
    }

    @Override
    public StatisticResponse getStatisticOfStore(Integer storeId) throws Exception {

        Store store = storeRepository.findById(storeId).orElseThrow(
                () -> new DataNotFoundException("Store not found")
        );

        List<Box> boxList = boxRepository.findAllByStore(store);

        Float sumPrice = 0F;

        for(Box box:boxList){
            sumPrice += box.getTotalPrice();
        }

        return StatisticResponse.builder()
                .nb_of_boxes(boxList.size())
                .totalPrice(sumPrice)
                .build();
    }
}
