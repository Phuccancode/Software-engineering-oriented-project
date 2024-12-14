 package com.project.harmonie_e_commerce.controller;

 import com.project.harmonie_e_commerce.model.ProductInCart;
 import com.project.harmonie_e_commerce.response.ProductInCartResponse;
 import com.project.harmonie_e_commerce.service.CartService;
 import com.project.harmonie_e_commerce.service.ExtractToken;
 import jakarta.servlet.http.HttpServletRequest;
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
     private ExtractToken extractToken;

     @GetMapping("/productincart")
     public ResponseEntity<List<ProductInCartResponse>> getAllProductsInCart(
             HttpServletRequest request
     ){
             Integer user_id = extractToken.getIdFromToken(request);
             return new ResponseEntity<>(cartService.getAllProductsInCart(user_id), HttpStatus.OK);
     }

     @DeleteMapping("/delete/{product_id}")
     public ResponseEntity<String> deleteItemInCart(
             @PathVariable Integer product_id,
             HttpServletRequest request
     ){
             Integer user_id = extractToken.getIdFromToken(request);
             cartService.deleteItemInCart(product_id,user_id);
             return new ResponseEntity<>("Delete successfully", HttpStatus.OK);
     }

     @PostMapping("/add/{product_id}")
     public ResponseEntity<ProductInCart> addProductToCart(
             @PathVariable Integer product_id,
             HttpServletRequest request
     ){
             Integer user_id = extractToken.getIdFromToken(request);
             return new ResponseEntity<>(cartService.addProductToCart(product_id,user_id), HttpStatus.OK);
     }

     @PutMapping("/update_quantity/{product_id}")
     public ResponseEntity<ProductInCart> updateQuantityProductInCart(
             @PathVariable Integer product_id,
             @RequestParam Integer newQuantity,
             HttpServletRequest request
     ){
            Integer user_id = extractToken.getIdFromToken(request);
             return new ResponseEntity<>(cartService.updateQuantityProductinCart(
                     product_id,user_id,newQuantity
             ), HttpStatus.OK);
     }

//     @DeleteMapping("/deletebyid/{id}")
//     public ResponseEntity<?> deleteProductInCartById(
//             @PathVariable Integer id
//     ){
//         return ResponseEntity.ok(cartService.deleteProductInCartById(id));
//     }

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
