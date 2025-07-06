package com.example.demo.VerificacionPublicacion.domain;


import com.example.demo.Publicacion.domain.Publicacion;
import com.example.demo.Publicacion.infrastructure.PublicacionRepository;
import com.example.demo.VerificacionPublicacion.infrastructure.VerificacionPublicacionRepository;
import com.example.demo.user.domain.Role;
import com.example.demo.user.domain.User;
import com.example.demo.user.infrastructure.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class VerificacionPublicacionService {

    private final PublicacionRepository publicacionRepository;
    private final UserRepository<User> userRepository;
    private final VerificacionPublicacionRepository verificacionRepository;

    public void verificarPublicacion(int publicacionId, int especialistaId) {
        Publicacion publicacion = publicacionRepository.findById(publicacionId)
                .orElseThrow(() -> new RuntimeException("Publicación no encontrada"));

        User especialista = userRepository.findById(especialistaId)
                .orElseThrow(() -> new RuntimeException("Especialista no encontrado"));

        if (especialista.getRole() != Role.ESPECIALISTA) {
            throw new RuntimeException("El usuario no es un especialista");
        }

        VerificacionPublicacion verificacion = new VerificacionPublicacion();
        verificacion.setPublicacion(publicacion);
        verificacion.setEspecialista(especialista);
        verificacion.setFechaVerificacion(LocalDateTime.now());

        verificacionRepository.save(verificacion);
    }
}