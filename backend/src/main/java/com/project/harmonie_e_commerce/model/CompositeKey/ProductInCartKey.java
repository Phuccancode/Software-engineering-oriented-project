package com.project.harmonie_e_commerce.model.CompositeKey;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductInCartKey implements Serializable {
    @Column(name = "cart_id")
    private Integer cartId;
    @Column(name = "product_id")
    private Integer productId;
}
