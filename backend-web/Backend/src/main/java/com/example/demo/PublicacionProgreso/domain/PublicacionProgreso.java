package com.example.demo.PublicacionProgreso.domain;

import com.example.demo.Progreso.domain.Progreso;
import com.example.demo.Publicacion.domain.Publicacion;
import com.example.demo.user.domain.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class PublicacionProgreso extends Publicacion {

    private Date fechaInicio;
    private Date fechaFin;
    private Double promedioPeso;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany
    private List<Progreso> progresos;
}
