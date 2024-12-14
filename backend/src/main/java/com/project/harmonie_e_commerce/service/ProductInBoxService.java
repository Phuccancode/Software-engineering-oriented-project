package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.repository.BoxRepository;
import com.project.harmonie_e_commerce.response.ProductInBoxRespone;
import com.project.harmonie_e_commerce.response.ProductResponse;
import org.springframework.stereotype.Service;

import com.project.harmonie_e_commerce.model.Box;
import com.project.harmonie_e_commerce.model.ProductInBox;
import com.project.harmonie_e_commerce.model.Product;

import com.project.harmonie_e_commerce.repository.ProductInBoxRepository;

import com.project.harmonie_e_commerce.dto.OrderProductInBoxDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class ProductInBoxService {

   private final ProductInBoxRepository productInBoxRepository;

   private final BoxRepository boxRepository;

   @Transactional
   public void createProductInBox(HttpServletRequest request, OrderProductInBoxDTO orderProductInBoxRequest){

       Box box = orderProductInBoxRequest.getBox();
       Product product = orderProductInBoxRequest.getProduct();
       Integer quantity = orderProductInBoxRequest.getQuantity();

       Float totalPrice = product.getPrice() * quantity;

       ProductInBox productInBox = ProductInBox.builder()
           .box(box)
           .product(product)
           .quantity(quantity)
           .totalPrice(totalPrice)
           .build();


       product.setQuantity(product.getQuantity() - quantity);
       product.setBuyingCount(product.getBuyingCount() + quantity);

       productInBoxRepository.save(productInBox);
   }

   @Transactional
   public Float getTotalPriceOfProducts(Box box){
       return productInBoxRepository.findSumPriceByBox(box);
   }


    public List<ProductInBoxRespone> getProductsInBox(Integer box_id) {
        Box box = boxRepository.findById(box_id).orElseThrow(
                () -> new DataNotFoundException("Cannot find box with id: " + box_id)
        );

        List<ProductInBox> productInBoxList = productInBoxRepository.findAllByBoxId(box_id);
        List<ProductInBoxRespone> responeList = new ArrayList<>();

        for (ProductInBox p: productInBoxList) {

            responeList.add(ProductInBoxRespone.fromProductInBox(p));

        }

        return responeList;
    }

}
