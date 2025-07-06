package com.example.demo.Ejercicio.infrastructure;

import com.example.demo.Ejercicio.domain.Ejercicio;
import com.example.demo.PublicacionRutina.domain.PublicacionRutina;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EjercicioRepository extends JpaRepository<Ejercicio, Long> {
    List<Ejercicio> findByRutinas(PublicacionRutina rutina);
}
