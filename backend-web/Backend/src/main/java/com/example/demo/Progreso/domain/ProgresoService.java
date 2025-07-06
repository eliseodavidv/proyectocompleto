package com.example.demo.Progreso.domain;

import com.example.demo.Progreso.infrastructure.ProgresoRepository;
import com.example.demo.user.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgresoService {

    private final ProgresoRepository progresoRepository;

    @Autowired
    public ProgresoService(ProgresoRepository progresoRepository) {
        this.progresoRepository = progresoRepository;
    }

    public Progreso crearProgreso(Progreso progreso) {
        return progresoRepository.save(progreso);
    }

    public List<Progreso> obtenerPorUsuario(User user) {
        return progresoRepository.findAllByUser(user);
    }

    public Optional<Progreso> obtenerPorId(Long id) {
        return progresoRepository.findById(id);
    }

    public void eliminarProgreso(Long id) {
        progresoRepository.deleteById(id);
    }
}
