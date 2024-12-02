package com.project.harmonie_e_commerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
        name = "orders"
)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "creation_date",columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp creation_date;
    @Column(name = "total_price", columnDefinition = "DECIMAL(10,2)")
    private Float total_price;
    @Column(name = "pay_method",nullable = false)
    @Enumerated(EnumType.STRING)
    private PayMethod pay_method;

    @ManyToOne
    @JoinColumn(name = "consignee_information_id")
    private DeliveryInformation deliveryInformation;

    @ManyToOne
    @JoinColumn(name = "system_discount_id")
    private SystemDiscount systemDiscount;

    public enum PayMethod{
        Cash,
        Credit,
        Debit
    }
}
