 package com.project.harmonie_e_commerce.service;

 import com.project.harmonie_e_commerce.exception.DataNotFoundException;
 import com.project.harmonie_e_commerce.model.CompositeKey.ProductInCartKey;
 import com.project.harmonie_e_commerce.model.Product;
 import com.project.harmonie_e_commerce.model.ProductImage;
 import com.project.harmonie_e_commerce.model.ProductInCart;
 import com.project.harmonie_e_commerce.model.User;
 import com.project.harmonie_e_commerce.repository.ProductImageRepository;
 import com.project.harmonie_e_commerce.repository.ProductInCartRepository;
 import com.project.harmonie_e_commerce.repository.ProductRepository;
 import com.project.harmonie_e_commerce.repository.UserRepository;
 import com.project.harmonie_e_commerce.response.*;
 import lombok.AllArgsConstructor;
 import org.springframework.stereotype.Service;

 import java.util.ArrayList;
 import java.util.List;
 import java.util.Optional;
 import java.util.stream.Collectors;


 @Service
 @AllArgsConstructor
 public class CartService implements ICartService{

     private final ProductInCartRepository productInCartRepository;

     private final ProductRepository productRepository;

     private final UserRepository userRepository;

     private final ProductImageRepository productImageRepository;

     @Override
     public List<ProductInCartResponse> getAllProductsInCart(Integer userId){

         User user = userRepository.findById(userId).orElseThrow(
                 () -> new DataNotFoundException("User not found")
         );

         List<ProductInCart> productInCartList = productInCartRepository.findAllByUser(user);
         return productInCartList.stream().map(p -> {
             try {
                 //lấy product gốc
                 Product product = productRepository.findById(p.getProduct().getId()).get();

                 List<ProductImage> images = productImageRepository.findByProductId(product.getId());

                 String url = "";
                 if (images.isEmpty()){
                     url = "No image";
                 } else {
                     url = images.get(0).getUrl();
                 }

                 ProductInCartResponse productInCartResponse = ProductInCartResponse.builder()
                         .id(product.getId())//id bên bảng product gốc
                         .name(product.getName())
                         .brand(product.getBrand())
                         .price(product.getPrice() * p.getQuantity())
                         .categoryName(product.getCategory().getName())
                         .quantity(p.getQuantity()) //lấy số lượng của từng sản phẩm
                         .store_id(product.getStore().getId())
                         .store_name(product.getStore().getName())
                         .productUrl(url)
                         .build();
                 return productInCartResponse;
             } catch (Exception e) {
                 throw new RuntimeException(e);
             }
         }).collect(Collectors.toList());
     }

     @Override
     public void deleteItemInCart(Integer product_id, Integer userId){

         Product product = productRepository.findById(product_id).get();

         User user = userRepository.findById(userId).orElseThrow(
                 () -> new DataNotFoundException("User not found")
         );

         ProductInCart productInCart = productInCartRepository.findByProductAndUser(product,user);
         if (productInCart == null){
             throw new DataNotFoundException("Can't find product by productId and userId");
         }

         //xóa khỏi database
         productInCartRepository.delete(productInCart);
     }

//     @Override
//     public Float getTotalPrice(Integer cartId) {
//         List<ProductInCart> productInCartList = productInCartRepository.findAllByProductInCartKey_CartId(cartId);
//         Float total = 0F;
//         for (ProductInCart p : productInCartList) {
//             total += p.getQuantity() * p.getProduct().getPrice(); // Tính tổng theo số lượng và giá của sản phẩm
//         }
//         return total;
//     }

     @Override
     public ProductInCart addProductToCart(Integer product_id, Integer userId){
         //nếu tồn tại sản phẩm rồi thì + quantity
         Product product = productRepository.findById(product_id).get();

         User user = userRepository.findById(userId).orElseThrow(
                 () -> new DataNotFoundException("User not found")
         );

         ProductInCart product_to_add = productInCartRepository.findByProductAndUser(product,user);
         if (product_to_add == null){
             //nếu chưa tồn tại thì thêm vào
             //TODO: check xem có ánh xạ được không
             ProductInCart newProduct = ProductInCart.builder()
                     .user(user)
                     .product(product) // xem xét throw, test hàm rồi sửa
                     .quantity(1)
                     .build();
             productInCartRepository.save(newProduct);
             return newProduct;
         }else{
             //update quantity của product
             product_to_add.setQuantity(product_to_add.getQuantity()+1);
             productInCartRepository.save(product_to_add);
             return product_to_add;
         }
     }

     @Override
     public ProductInCart updateQuantityProductinCart(Integer product_id, Integer userId, Integer newQuantity){
         Product product = productRepository.findById(product_id).get();

         User user = userRepository.findById(userId).orElseThrow(
                 () -> new DataNotFoundException("User not found")
         );

         ProductInCart product_to_add = productInCartRepository.findByProductAndUser(product,user);
         product_to_add.setQuantity(newQuantity);
         return productInCartRepository.save(product_to_add);
     }


     @Override
     public StringResponse deleteProductInCartById(Integer id) {
         ProductInCart productInCart = productInCartRepository.findById(id).orElseThrow(
                 () -> new DataNotFoundException("Not found product in cart")
         );
         productInCartRepository.delete(productInCart);
         return new StringResponse("Xoa thanh cong");
     }
 }
