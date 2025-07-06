package com.example.demo.Ejercicio.Dtos;

import lombok.Data;

import java.util.List;

@Data
public class CrearEjercicioDTO {
    private String nombre;
    private String descripcion;
    private int series;
    private int repeticiones;
    private int descansoSegundos;
    private double pesoKg;
    private String imagenUrl;

}
