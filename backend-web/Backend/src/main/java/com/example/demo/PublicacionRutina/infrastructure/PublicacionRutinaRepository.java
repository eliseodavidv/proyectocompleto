package com.example.demo.PublicacionRutina.infrastructure;

import com.example.demo.PublicacionRutina.domain.PublicacionRutina;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface PublicacionRutinaRepository extends JpaRepository<PublicacionRutina, Long> {
    List<PublicacionRutina> findByObjetivoIgnoreCaseContaining(String objetivo);

}
