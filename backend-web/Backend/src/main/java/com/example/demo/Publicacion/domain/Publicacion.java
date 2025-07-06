package com.example.demo.Publicacion.domain;


import com.example.demo.Grupo.domain.Grupo;
import com.example.demo.user.domain.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Inheritance(strategy = InheritanceType.JOINED)
public class Publicacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_publicacion;

    private String titulo;
    private String contenido;

    private LocalDateTime fechaCreacion;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private boolean verificada = false;
}
