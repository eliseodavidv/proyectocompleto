package com.example.demo.VerificacionPublicacion.domain;


import com.example.demo.Publicacion.domain.Publicacion;
import com.example.demo.user.domain.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class VerificacionPublicacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean verificada;
    private String comentario;
    private LocalDateTime fechaVerificacion;

    @ManyToOne
    @JoinColumn(name = "publicacion_id")
    private Publicacion publicacion;

    @ManyToOne
    @JoinColumn(name = "especialista_id")
    private User especialista;


}
