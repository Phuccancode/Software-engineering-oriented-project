 package com.project.harmonie_e_commerce.controller;

 import com.project.harmonie_e_commerce.model.ProductInCart;
 import com.project.harmonie_e_commerce.response.ProductInCartResponse;
 import com.project.harmonie_e_commerce.service.CartService;
 import lombok.AllArgsConstructor;
 import org.springframework.http.HttpStatus;
 import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.*;

 import java.util.List;

 @RestController
 @RequestMapping("${api.prefix}/")
 @AllArgsConstructor
 public class CartController {

     private CartService cartService;

     @GetMapping("/productincart/{user_id}")
     public ResponseEntity<List<ProductInCartResponse>> getAllProductsInCart(
             @PathVariable Integer user_id
     ){
         try {
             return new ResponseEntity<>(cartService.getAllProductsInCart(user_id), HttpStatus.OK);
         } catch (Exception e) {
             throw new RuntimeException(e);
         }
     }

     @DeleteMapping("/delete/{user_id}/{product_id}")
     public ResponseEntity<String> deleteItemInCart(
             @PathVariable Integer product_id,
             @PathVariable Integer user_id
     ){
         try {
             cartService.deleteItemInCart(product_id,user_id);
             return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
         } catch (Exception e) {
             return new ResponseEntity<>("Cant delete", HttpStatus.OK);
         }
     }

     @PostMapping("/add/{user_id}/{product_id}")
     public ResponseEntity<ProductInCart> addProductToCart(
             @PathVariable Integer product_id,
             @PathVariable Integer user_id
     ){
         try {
             return new ResponseEntity<>(cartService.addProductToCart(product_id,user_id), HttpStatus.OK);
         } catch (Exception e) {
             throw new RuntimeException(e);
         }
     }

     @PutMapping("/update_quantity/{user_id}/{product_id}")
     public ResponseEntity<ProductInCart> updateQuantityProductInCart(
             @PathVariable Integer product_id,
             @PathVariable Integer user_id,
             @RequestParam Integer newQuantity
     ){
         try {
             return new ResponseEntity<>(cartService.updateQuantityProductinCart(
                     product_id,user_id,newQuantity
             ), HttpStatus.OK);
         } catch (Exception e) {
             throw new RuntimeException(e);
         }
     }

//     @GetMapping("/price")
//     public ResponseEntity<Float> getTotalPrice(
//             @PathVariable Integer cart_id
//     ){
//         try {
//             return new ResponseEntity<>(cartService.getTotalPrice(cart_id), HttpStatus.OK);
//         } catch (Exception e) {
//             throw new RuntimeException(e);
//         }
//     }
 }
