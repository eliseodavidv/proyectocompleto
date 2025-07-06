package com.example.demo.Publicacion.domain;

import com.example.demo.Publicacion.infrastructure.PublicacionRepository;
import com.example.demo.user.domain.User;
import com.example.demo.user.infrastructure.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PublicacionService {

    @Autowired
    private PublicacionRepository publicacionRepo;

    @Autowired
    private UserRepository<User> userRepository;


    public Publicacion crear(String titulo, String contenido, Integer userId) {
        User autor = (User) userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Publicacion p = new Publicacion();
        p.setTitulo(titulo);
        p.setContenido(contenido);
        p.setUser(autor);
        p.setFechaCreacion(LocalDateTime.now());

        return publicacionRepo.save(p);
    }

    public List<Publicacion> listarTodas() {
        return publicacionRepo.findAll();
    }

    public Publicacion obtenerPorId(Integer id) {
        return publicacionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Publicación no encontrada"));
    }

    public List<Publicacion> listarPorAutor(Integer userId) {
        return publicacionRepo.findByUserId(userId);
    }

}

