package com.example.demo.Comentario.infrastructure;

import com.example.demo.Comentario.domain.Comentario;
import com.example.demo.Publicacion.domain.Publicacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    List<Comentario> findByPublicacion(Publicacion publicacion);
}
