package com.example.demo.Progreso.domain;

import com.example.demo.user.domain.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Progreso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double peso;

    private Date fecha;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
