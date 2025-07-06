package com.example.demo.Ejercicio.domain;

import com.example.demo.PublicacionRutina.domain.PublicacionRutina;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
public class Ejercicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String descripcion;
    private int series;
    private int repeticiones;
    private int descansoSegundos;
    private double pesoKg;


    private String imagenUrl;


    @ManyToMany(mappedBy = "ejercicios")
    private List<PublicacionRutina> rutinas = new ArrayList<>();

}
