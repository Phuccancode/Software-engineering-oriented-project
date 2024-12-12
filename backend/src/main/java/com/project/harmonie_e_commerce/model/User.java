package com.project.harmonie_e_commerce.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "fname", length = 20, nullable = false)
    private String fname;

    @Column(name = "lname", length = 20, nullable = false)
    private String lname;

    @Column(name = "password", length = 255, nullable = false)
    private String password;

    @Column(name = "dob", nullable = false)
    private Date dob;

    @Enumerated(EnumType.STRING)
    @Column(name = "sex", nullable = false)
    private Sex sex;

    @Column(name = "phone", length = 10, unique = true, nullable = false)
    private String phone;

    @Column(name = "email", length = 255, unique = true, nullable = false)
    private String email;

    @Column(name = "creation_date", nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp creation_date;

    public enum Sex {
        M, F, OTHER
    }
}
