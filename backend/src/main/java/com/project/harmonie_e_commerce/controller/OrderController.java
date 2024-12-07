package com.project.harmonie_e_commerce.controller;

import com.project.harmonie_e_commerce.service.OrderService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

import com.project.harmonie_e_commerce.dto.OrderDTO;
import com.project.harmonie_e_commerce.response.OrderResponse;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;




// {
//     "consignee_information_id": 5,
//     "system_discount_id": 4,
//     "pay_method": "credit",
//     "products": [
//       {
//         "id": 89,
//         "quantity": 2
//       },
//       {
//         "id": 4,
//         "quantity": 1
//       },
//       ...
//     ],
//     "store_discounts_ids": [ 34, 3, ... ],
//     "shipping_discounts_id": 2
// }



@RestController
@AllArgsConstructor
@RequestMapping("${api.prefix}/order")
public class OrderController {

   private final OrderService orderService;

   @PostMapping("")
   public ResponseEntity<?> createOrder(HttpServletRequest request,
   @Valid @RequestBody OrderDTO orderRequest){
       try {
           String respone = orderService.createOrder(request, orderRequest);
           return ResponseEntity.ok(respone);
       } catch (Exception e) {
           return ResponseEntity.badRequest().body(e.getMessage());
       }
   }

   @GetMapping("/user/{user_id}")
    public ResponseEntity<?> getOrdersByUserId(HttpServletRequest request, @PathVariable Integer user_id){
        try {
            return ResponseEntity.ok(orderService.getOrdersByUserId(request, user_id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

   @GetMapping("/{id}")
   public ResponseEntity<?> getOrder(HttpServletRequest request, @PathVariable Integer id){
       try {
           OrderResponse orderResponse = orderService.getOrderById(request, id);
           return ResponseEntity.ok(orderResponse);
       } catch (Exception e) {
           return ResponseEntity.badRequest().body(e.getMessage());
       }
   }

   @GetMapping("/all")
    public ResponseEntity<?> getAllOrders(HttpServletRequest request){
        try {
            return ResponseEntity.ok(orderService.getAll(request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    
}
