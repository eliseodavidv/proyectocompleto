package com.example.demo.PublicacionRutina.domain;

import com.example.demo.Ejercicio.domain.Ejercicio;
import com.example.demo.Publicacion.domain.Publicacion;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Data
public class PublicacionRutina extends Publicacion {


    private String nombreRutina;
    private int duracion;
    private String descripcion;
    private String frecuencia;
    private String dificultad;
    private String objetivo;

    @ManyToMany
    @JoinTable(
            name = "rutina_ejercicio",
            joinColumns = @JoinColumn(name = "rutina_id"),
            inverseJoinColumns = @JoinColumn(name = "ejercicio_id")
    )
    private List<Ejercicio> ejercicios = new ArrayList<>();

}
