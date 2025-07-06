package com.example.demo.Publicacion.infrastructure;

import com.example.demo.Publicacion.domain.Publicacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PublicacionRepository extends JpaRepository<Publicacion, Integer> {
    List<Publicacion> findByUserId(Integer userId);
}
