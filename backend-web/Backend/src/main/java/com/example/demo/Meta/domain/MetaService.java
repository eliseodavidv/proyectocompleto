package com.example.demo.Meta.domain;

import com.example.demo.Meta.events.MetaCreadaEvent;
import com.example.demo.Meta.infrastructure.MetaRepository;
import com.example.demo.user.domain.User;
import com.example.demo.user.infrastructure.UserRepository;
import com.example.demo.exceptions.ResourceNotFoundException;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MetaService {

    private final MetaRepository metaRepository;
    private final UserRepository<User> userRepository;
    private final ApplicationEventPublisher eventPublisher;

    public MetaService(MetaRepository metaRepository, UserRepository<User> userRepository, ApplicationEventPublisher eventPublisher) {
        this.metaRepository = metaRepository;
        this.userRepository = userRepository;
        this.eventPublisher = eventPublisher;
    }

    public Meta crearMeta(Meta meta, int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        meta.setUser(user);
        Meta nuevaMeta = metaRepository.save(meta);

        // Publicar el evento después de crear la meta
        eventPublisher.publishEvent(new MetaCreadaEvent(this, nuevaMeta));
        return nuevaMeta;
    }

    public List<Meta> obtenerMetasDeUsuario(int userId) {
        return metaRepository.findByUserId(userId);
    }

    public void marcarComoCumplida(Long metaId) {
        Meta meta = metaRepository.findById(metaId)
                .orElseThrow(() -> new ResourceNotFoundException("Meta no encontrada"));
        meta.setCumplida(true);
        metaRepository.save(meta);
    }
}
