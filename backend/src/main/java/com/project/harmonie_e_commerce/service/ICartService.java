package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.ProductDTO;
import com.project.harmonie_e_commerce.dto.ProductImageDTO;
import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.Cart;
import com.project.harmonie_e_commerce.model.Product;
import com.project.harmonie_e_commerce.model.ProductImage;
import com.project.harmonie_e_commerce.model.ProductInCart;
import com.project.harmonie_e_commerce.response.CartResponse;
import com.project.harmonie_e_commerce.response.ProductInCartResponse;
import com.project.harmonie_e_commerce.response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface ICartService {
    CartResponse createCart();
    CartResponse getCartById(Long cart_id) throws Exception;
    List<ProductInCartResponse> getAllProductsInCart(Long cartId) throws Exception;

    void deleteItemInCart(Long product_id, Long cartId) throws Exception;

    CartResponse addProductToCart(Long product_id, Long cart_id) throws Exception;

    ProductInCart updateQuantityProductinCart(Long product_id, Long cart_id, Integer newQuantity) throws  Exception;

    Float getTotalPrice(Long cartId);

}
