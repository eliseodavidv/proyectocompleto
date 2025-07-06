package com.example.demo.Meta.domain;
import com.example.demo.user.domain.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Meta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descripcion;

    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    private boolean cumplida;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
