package com.example.demo.PublicacionPlanAlimentacion.domain;

import com.example.demo.PublicacionPlanAlimentacion.infrastructure.PublicacionPlanAlimentacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PublicacionPlanAlimentacionService {

    private final PublicacionPlanAlimentacionRepository repo;

    @Autowired
    public PublicacionPlanAlimentacionService(PublicacionPlanAlimentacionRepository repo) {
        this.repo = repo;
    }

    public PublicacionPlanAlimentacion crearPlan(PublicacionPlanAlimentacion plan) {
        return repo.save(plan);
    }

    public List<PublicacionPlanAlimentacion> obtenerTodos() {
        return repo.findAll();
    }

    public Optional<PublicacionPlanAlimentacion> obtenerPorId(Long id) {
        return repo.findById(id);
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }
}
