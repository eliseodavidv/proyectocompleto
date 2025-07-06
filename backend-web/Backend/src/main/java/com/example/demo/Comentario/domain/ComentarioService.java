package com.example.demo.Comentario.domain;

import com.example.demo.Comentario.infrastructure.ComentarioRepository;
import com.example.demo.Publicacion.domain.Publicacion;
import com.example.demo.Publicacion.infrastructure.PublicacionRepository;
import com.example.demo.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComentarioService {

    private final ComentarioRepository comentarioRepo;
    private final PublicacionRepository publicacionRepo;

    @Autowired
    public ComentarioService(ComentarioRepository comentarioRepo, PublicacionRepository publicacionRepo) {
        this.comentarioRepo = comentarioRepo;
        this.publicacionRepo = publicacionRepo;
    }

    public Comentario crearComentario(String contenido, Integer publicacionId, User autor) {
        Publicacion publicacion = publicacionRepo.findById(publicacionId)
                .orElseThrow(() -> new RuntimeException("Publicación no encontrada"));

        Comentario comentario = new Comentario();
        comentario.setContenido(contenido);
        comentario.setPublicacion(publicacion);
        comentario.setAutor(autor);

        return comentarioRepo.save(comentario);
    }

    public List<Comentario> obtenerComentariosPorPublicacion(Integer publicacionId) {
        Publicacion publicacion = publicacionRepo.findById(publicacionId)
                .orElseThrow(() -> new RuntimeException("Publicación no encontrada"));
        return comentarioRepo.findByPublicacion(publicacion);
    }
}
