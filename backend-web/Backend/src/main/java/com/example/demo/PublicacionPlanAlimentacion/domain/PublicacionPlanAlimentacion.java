package com.example.demo.PublicacionPlanAlimentacion.domain;

import com.example.demo.Publicacion.domain.Publicacion;
import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data
public class PublicacionPlanAlimentacion extends Publicacion {

    private String tipoDieta;
    private int calorias;
    private String objetivos;
    private String restricciones;
}
