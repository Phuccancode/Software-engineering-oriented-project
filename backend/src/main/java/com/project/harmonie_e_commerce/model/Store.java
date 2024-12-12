package com.project.harmonie_e_commerce.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "stores")
public class Store {
    @Id
    private Integer id;

    @OneToOne
    @JoinColumn(name = "id")
    private User user;

    @Column(name = "name", nullable = false, length = 20)
    private String name;
    @Column(name = "address", nullable = false, length = 100)
    private String address;
    @Column(name = "creation_date",nullable = false)
    @CreationTimestamp
    private Timestamp creation_date;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    @Column(name = "tax_id",unique = true)
    private String tax_id;
}
