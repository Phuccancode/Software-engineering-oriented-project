package com.project.harmonie_e_commerce.service;

import org.springframework.stereotype.Service;

import com.project.harmonie_e_commerce.model.Box;
import com.project.harmonie_e_commerce.model.Box.BoxStatus;
import com.project.harmonie_e_commerce.model.Order;
import com.project.harmonie_e_commerce.model.Product;
import com.project.harmonie_e_commerce.model.ShippingDiscount;
import com.project.harmonie_e_commerce.model.StoreDiscount;
import com.project.harmonie_e_commerce.dto.OrderBoxDTO;
import com.project.harmonie_e_commerce.dto.OrderProductInBoxDTO;

import com.project.harmonie_e_commerce.repository.BoxRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import java.sql.Timestamp;
import java.util.List;
import java.util.Random;
import java.time.LocalDate;
import com.project.harmonie_e_commerce._lib.Pair;

@Service
@AllArgsConstructor
public class BoxService {

   private final BoxRepository boxRepository;
   private final ProductInBoxService productInBoxService;

   @Transactional
   public void createBox(HttpServletRequest request, OrderBoxDTO orderBoxRequest){

       Random rand = new Random();
    //    Integer minFeeShip = 10000;
    //    Integer maxFeeShip = 1000000;
    //    Float feeShip = rand.nextFloat(maxFeeShip - minFeeShip) + minFeeShip;

       Integer minPredictedDeliveryDate = 2;
       Integer maxPredictedDeliveryDate = 5;

       LocalDate predictedDeliveryDate = LocalDate.now().plusDays(
           rand.nextInt(maxPredictedDeliveryDate - minPredictedDeliveryDate) + minPredictedDeliveryDate);

       Box box = Box.builder()
           .order(orderBoxRequest.getOrder())
           .store(orderBoxRequest.getStore())
           .storeDiscount(orderBoxRequest.getStoreDiscount())
           .shippingDiscount(orderBoxRequest.getShippingDiscount())
           .shipperName("Nguyen Van A")
           .shipperPhone("0123456789")
           .feeShip(0f) // set to 0 temporarily since it is not null field
           .predictedDeliveryDate(predictedDeliveryDate)
           .caution(orderBoxRequest.getCaution())
           .totalPrice(0f) // set to 0 temporarily since it is not null field 
           .packingDate(new Timestamp(System.currentTimeMillis()))
           .status(BoxStatus.Pending)
           .build();

        // save box temporarily to have box entity for creating productInBox entities
        boxRepository.save(box);        

       List<Pair<Product, Integer>> products = orderBoxRequest.getProducts();
       for (Pair<Product, Integer> product : products) {
           OrderProductInBoxDTO orderProductInBoxRequest =
               new OrderProductInBoxDTO(box, product.first, product.second);

           productInBoxService.createProductInBox(request, orderProductInBoxRequest);
       }

       Float totalPrice = productInBoxService.getTotalPriceOfProducts(box);

       
       Float feeShip = 0.2f * totalPrice + 
            rand.nextFloat(10000 - (-10000)) + (-10000);      
       box.setFeeShip(feeShip);

       totalPrice += feeShip;
       StoreDiscount storeDiscount = box.getStoreDiscount();
       if(storeDiscount != null) {
           totalPrice -= storeDiscount.getAmount();
           storeDiscount.getDiscount().setQuantity(storeDiscount.getDiscount().getQuantity() - 1);
        }

       ShippingDiscount shippingDiscount = box.getShippingDiscount();
       if(shippingDiscount != null){
           Float shippingDiscountAmount = shippingDiscount.getMaxAmount();
           if (shippingDiscountAmount > feeShip)
               shippingDiscountAmount = feeShip;
           totalPrice -= shippingDiscountAmount;
           shippingDiscount.getDiscount().setQuantity(shippingDiscount.getDiscount().getQuantity() - 1);
       }

       if (totalPrice < 0) totalPrice = 0.0f;

       box.setTotalPrice(totalPrice);
       boxRepository.saveAndFlush(box);
   }

   Float getTotalPriceOfBoxes(Order order){
       return boxRepository.findSumPriceByOrder(order);
   }
}
