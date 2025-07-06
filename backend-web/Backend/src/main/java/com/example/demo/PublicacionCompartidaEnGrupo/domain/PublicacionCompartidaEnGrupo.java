package com.example.demo.PublicacionCompartidaEnGrupo.domain;

import com.example.demo.Grupo.domain.Grupo;
import com.example.demo.Publicacion.domain.Publicacion;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class PublicacionCompartidaEnGrupo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Publicacion publicacionOriginal;

    @ManyToOne
    private Grupo grupo;

    private LocalDateTime fechaCompartida;
}
