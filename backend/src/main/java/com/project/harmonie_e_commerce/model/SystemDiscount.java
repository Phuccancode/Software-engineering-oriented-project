package com.project.harmonie_e_commerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Check;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "system_discounts")
@Check(constraints = "percentage BETWEEN 0 AND 100")
public class SystemDiscount{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "discount_id")
    private Discount discount;

    @Column(name = "max_amount", columnDefinition = "DECIMAL(10,2)", nullable = false)
    private Float maxAmount;
    @Column(name = "percentage", nullable = false)
    private Integer percentage;
    @Column(name = "min_bill_amt", columnDefinition = "DECIMAL(10,2) DEFAULT 0", nullable = false)
    private Float minBillAmount;
}
