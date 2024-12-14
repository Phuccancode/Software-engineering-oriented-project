package com.project.harmonie_e_commerce.service;

import com.project.harmonie_e_commerce.dto.ProductDTO;
import com.project.harmonie_e_commerce.dto.ProductImageDTO;
import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.Product;
import com.project.harmonie_e_commerce.model.ProductImage;
import com.project.harmonie_e_commerce.model.ProductInCart;
import com.project.harmonie_e_commerce.response.CartResponse;
import com.project.harmonie_e_commerce.response.ProductInCartResponse;
import com.project.harmonie_e_commerce.response.ProductResponse;
import com.project.harmonie_e_commerce.response.StringResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface ICartService {
    List<ProductInCartResponse> getAllProductsInCart(Integer userId);

    void deleteItemInCart(Integer product_id, Integer userId);

    ProductInCart addProductToCart(Integer product_id, Integer userId);

    ProductInCart updateQuantityProductinCart(Integer product_id,Integer userId, Integer newQuantity);

    StringResponse deleteProductInCartById(Integer id);

//    Float getTotalPrice(Integer userId) throws Exception;

}
