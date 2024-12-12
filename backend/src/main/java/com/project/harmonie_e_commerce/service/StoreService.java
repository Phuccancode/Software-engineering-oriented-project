package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.StoreDTO;
import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.*;
import com.project.harmonie_e_commerce.repository.*;
import com.project.harmonie_e_commerce.response.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
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
    public Store addNewStore(StoreDTO storeDTO, Integer userId) {
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
    public List<ProductResponse> showAllProductInStore(Integer storeId){
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
    public List<BoxResponse> showAllBoxInStore(Integer storeId) {
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
    public List<StoreDiscountRespone> showAllStoreDiscountInStore(Integer storeId){
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
    public StatisticResponse getStatisticOfStore(Integer storeId, Integer day, Integer month, Integer year) {

        Store store = storeRepository.findById(storeId).orElseThrow(
                () -> new DataNotFoundException("Store not found")
        );

        List<Box> boxList = boxRepository.findAllByStore(store);

        LocalDate date = LocalDate.of(year,month,day);

        Float sumPrice = 0F;
        Integer numBox = 0;

        for(Box box:boxList){
            Timestamp timestamp = box.getPackingDate();
            LocalDate dateFromTimestamp = timestamp.toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDate();
            if (date.equals(dateFromTimestamp)) {
                sumPrice += box.getTotalPrice();
                numBox++;
            }
        }

        return StatisticResponse.builder()
                .date(date)
                .nb_of_boxes(numBox)
                .totalPrice(sumPrice)
                .build();
    }

    @Override
    public List<Store> getAllStore() {
        return storeRepository.findAll();
    }

    @Override
    public Store updateStore(StoreDTO storeDTO, Integer store_id) {
        Store store = storeRepository.findById(store_id).orElseThrow(
                () -> new DataNotFoundException("Store not found by id " + store_id)
        );
        store.setAddress(storeDTO.getAddress());
        store.setName(storeDTO.getName());
        store.setDescription(storeDTO.getDescription());
        store.setTax_id(storeDTO.getTax_id());

        return storeRepository.save(store);
    }

    @Override
    public StringResponse deleteStore(Integer store_id) {
        Store store = storeRepository.findById(store_id).orElseThrow(
                () -> new DataNotFoundException("Store not found by id " + store_id)
        );
        storeRepository.delete(store);
        return new StringResponse("Delete successfully");
    }
}
