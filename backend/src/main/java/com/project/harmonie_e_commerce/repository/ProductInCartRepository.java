package com.project.harmonie_e_commerce.repository;

// import com.project.harmonie_e_commerce.model.CompositeKey.ProductInCartKey;
import com.project.harmonie_e_commerce.model.Product;
import com.project.harmonie_e_commerce.model.ProductInCart;
import com.project.harmonie_e_commerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductInCartRepository extends JpaRepository<ProductInCart, Integer> {
//   List<ProductInCart> findAllByProductInCartKey_CartId(Integer cart_id);
//   ProductInCart findByProductInCartKey_CartIdAndProductInCartKey_ProductId(Integer cart_id, Integer product_id);
    List<ProductInCart> findAllByUser(User user);

    ProductInCart findByProductAndUser(Product product,User user);
}
