package com.example.demo.PublicacionGrupo.domain;

import com.example.demo.Grupo.domain.Grupo;
import com.example.demo.Publicacion.domain.Publicacion;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PublicacionGrupo extends Publicacion {
    @ManyToOne
    @JoinColumn(name = "grupo_id", nullable = false)
    private Grupo grupo;
}
