package com.project.harmonie_e_commerce.service;

import org.springframework.stereotype.Service;

import com.project.harmonie_e_commerce.model.Order;
import com.project.harmonie_e_commerce.model.SystemDiscount;
import com.project.harmonie_e_commerce.model.Order.PayMethod;
import com.project.harmonie_e_commerce.model.DeliveryInformation;
import com.project.harmonie_e_commerce.model.Store;
import com.project.harmonie_e_commerce.model.StoreDiscount;
import com.project.harmonie_e_commerce.model.Product;
import com.project.harmonie_e_commerce.model.ShippingDiscount;

import com.project.harmonie_e_commerce.repository.*;
import com.project.harmonie_e_commerce.response.OrderResponse;
import com.project.harmonie_e_commerce.dto.OrderDTO;
import com.project.harmonie_e_commerce.dto.OrderProductDTO;
import com.project.harmonie_e_commerce.dto.OrderBoxDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import com.project.harmonie_e_commerce._lib.Pair;

import lombok.*;


@Service
@AllArgsConstructor
public class OrderService {

   private final OrderRepository orderRepository;
   private final ProductRepository productRepository;
   private final DeliveryInformationRepository deliveryInformationRepository;
   private final SystemDiscountRepository systemDiscountRepository;
   private final StoreDiscountRepository storeDiscountRepository;
   private final ShippingDiscountRepository shippingDiscountRepository;
   private final BoxRepository boxRepository;
   private final ProductInBoxRepository productInBoxRepository;

   private final BoxService boxService;


   @Transactional
   public String createOrder(HttpServletRequest request, OrderDTO orderRequest) {
       Order order = new Order();

       // Set the delivery information
       Integer deliveryInformationId = orderRequest.getConsigneeInformationId();
       DeliveryInformation deliveryInformation = deliveryInformationRepository.findById(deliveryInformationId)
                                                                              .orElseThrow(() -> new RuntimeException("Delivery information not found"));
       order.setDeliveryInformation(deliveryInformation);

       // Set the system discount - optional
       Integer systemDiscountId = orderRequest.getSystemDiscountId();
       if (systemDiscountId != null){
           SystemDiscount systemDiscount = systemDiscountRepository.findById(systemDiscountId)
                                                                   .orElseThrow(() -> new RuntimeException("System discount not found"));
           
           if(systemDiscount.getDiscount().getQuantity() == 0)
               throw new RuntimeException("System discount id=" + systemDiscountId + " is out of stock");
           if(systemDiscount.getDiscount().getExpirationDate().before(new Timestamp(System.currentTimeMillis())))
               throw new RuntimeException("System discount id=" + systemDiscountId + " is expired");

           order.setSystemDiscount(systemDiscount);
       }

       // Set the pay method
       PayMethod payMethod = orderRequest.getPayMethod();
       order.setPayMethod(payMethod);

       // save order temporarily to exist Order entity for creating Box entities
       order.setCreationDate(new Timestamp(System.currentTimeMillis()));
       orderRepository.save(order);

       // Get all stores of products, btw get storeDiscounts for each store
       // ProductInStore = {store1: [ [{product1, qtt1}, {product2, qtt2},...], store1Discount ],
       //                   store2: [ [{product1, qtt1}, {product2, qtt2},...], store2Discount ],
       //                  ...}


       // DSA time :)))
       HashMap<Store, Pair< List< Pair<Product, Integer> >, StoreDiscount> > productInStores = new HashMap<>();

       List<OrderProductDTO> orderProductDTOs = orderRequest.getProducts();
       for (OrderProductDTO orderProductDTO : orderProductDTOs) {
           Integer productId = orderProductDTO.getId();
           Integer buyQuantity = orderProductDTO.getQuantity();
           Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new RuntimeException("Product id=" + productId + " not found"));

           Integer remainingQuantity = product.getQuantity();

           if (remainingQuantity < buyQuantity)
               throw new RuntimeException("Not enough product " + product.getName() + " in stock");


           Store store = productRepository.findStoreByProductId(productId)
                        .orElseThrow(() -> new RuntimeException("Product id=" + productId + " not in any store"));

           // handle case this is the first time this store appears
           productInStores.putIfAbsent(store, new Pair<>(new ArrayList<>(), null)); // storeDiscount is null for now

           // here, store surely has existed in hashmap

           // append product into value list of storeId key
           List<Pair<Product, Integer>> products = productInStores.get(store).first;
           products.add(new Pair<>(product, buyQuantity)); // because products is a reference to value list in hashmap, no need for "re-put"
       }


       // traverse all storeDiscounts to assign to each store
       List<Integer> storeDiscountIds = orderRequest.getStoreDiscountsIds();
       if (storeDiscountIds != null) {
            for (Integer storeDiscountId : storeDiscountIds){
                StoreDiscount storeDiscount = storeDiscountRepository.findById(storeDiscountId)
                            .orElseThrow(() -> new RuntimeException("Store discount id=" + storeDiscountId + " not found"));
                
                    Store store = storeDiscount.getStore();
                if(!productInStores.containsKey(store))
                    throw new RuntimeException("Store discount id=" + storeDiscountId +  " does not match any store");
                
                if(storeDiscount.getDiscount().getQuantity() == 0)
                    throw new RuntimeException("Store discount id=" + storeDiscountId + " is out of stock");
                if(storeDiscount.getDiscount().getExpirationDate().before(new Timestamp(System.currentTimeMillis())))
                    throw new RuntimeException("Store discount id=" + storeDiscountId + " is expired");
                
                productInStores.get(store).second = storeDiscount;
            }
        }


       // Get shippingDiscount for passing to each OrderBoxDTO
       Integer shippingDiscountId = orderRequest.getShippingDiscountId();
       ShippingDiscount shippingDiscount = shippingDiscountId == null ? null :
            shippingDiscountRepository.findById(shippingDiscountId)
                    .orElseThrow(() -> new RuntimeException("Shipping discount id=" + shippingDiscountId + " not found"));
       
                                    
       // create boxes, number of boxes exactly equal size of hashmap above
       // Note: this initial is capcity, not truely size
       // List<Box> boxes = new ArrayList<>(productInStores.size());

       for (Map.Entry<Store, Pair<List<Pair<Product, Integer>>, StoreDiscount>> entry : productInStores.entrySet()){

           Store store = entry.getKey();
           StoreDiscount storeDiscount = entry.getValue().second;
           String caution = "Caution: fragile";
           List<Pair<Product, Integer>> products = entry.getValue().first;

           OrderBoxDTO orderBoxRequest =
               new OrderBoxDTO(order, store,
                               storeDiscount,
                               shippingDiscount,
                               caution, products);

           boxService.createBox(request, orderBoxRequest);
       }


       Float totalPrice = boxService.getTotalPriceOfBoxes(order);
       SystemDiscount systemDiscount = order.getSystemDiscount();
       if(systemDiscount != null  &&  totalPrice >= systemDiscount.getMinBillAmount()){
           Float decreaseAmount = totalPrice * systemDiscount.getPercentage()/100;
           if (decreaseAmount > systemDiscount.getMaxAmount())
               decreaseAmount = systemDiscount.getMaxAmount();
           totalPrice -= decreaseAmount;
           systemDiscount.getDiscount().setQuantity(systemDiscount.getDiscount().getQuantity() - 1);
       }

       order.setTotalPrice(totalPrice);

    //    return OrderResponse.fromOrder(orderRepository.saveAndFlush(order), boxRepository, productInBoxRepository);
       return "Add order successfully";
    }

    public OrderResponse getOrderById(HttpServletRequest request, Integer id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order id=" + id + " not found"));
        return OrderResponse.fromOrder(order, boxRepository, productInBoxRepository);
    }

    public List<OrderResponse> getAll(HttpServletRequest request) {
        List<Order> orders = orderRepository.findAll();
        List<OrderResponse> orderResponses = new ArrayList<>();
        for (Order order : orders) {
            orderResponses.add(OrderResponse.fromOrder(order, boxRepository, productInBoxRepository));
        }
        return orderResponses;
    }

    public List<OrderResponse> getOrdersByUserId(HttpServletRequest request, Integer user_id) {
        List<Order> orders = orderRepository.findByUserIdThroughConsigneeInfomation(user_id);
        List<OrderResponse> orderResponses = new ArrayList<>();
        for (Order order : orders) {
            orderResponses.add(OrderResponse.fromOrder(order, boxRepository, productInBoxRepository));
        }
        return orderResponses;
    }
}
