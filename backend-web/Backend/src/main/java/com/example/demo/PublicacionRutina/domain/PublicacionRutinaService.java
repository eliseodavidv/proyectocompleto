package com.example.demo.PublicacionRutina.domain;

import com.example.demo.Ejercicio.domain.Ejercicio;
import com.example.demo.Ejercicio.infrastructure.EjercicioRepository;
import com.example.demo.PublicacionRutina.infrastructure.PublicacionRutinaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@Service
public class PublicacionRutinaService {

    private final PublicacionRutinaRepository rutinaRepository;
    private final EjercicioRepository ejercicioRepository;

    @Autowired
    public PublicacionRutinaService(PublicacionRutinaRepository rutinaRepository, EjercicioRepository ejercicioRepository) {
        this.rutinaRepository = rutinaRepository;
        this.ejercicioRepository = ejercicioRepository;
    }

    public PublicacionRutina crearRutina(PublicacionRutina rutina) {
        return rutinaRepository.save(rutina);
    }

    public Page<PublicacionRutina> obtenerTodas(Pageable pageable) {
        return rutinaRepository.findAll(pageable);
    }

    public Optional<PublicacionRutina> obtenerPorId(Long id) {
        return rutinaRepository.findById(id);
    }

    public void eliminarRutina(Long id) {
        rutinaRepository.deleteById(id);
    }

    public PublicacionRutina asignarEjercicios(Long rutinaId, List<Long> ejerciciosIds) {
        PublicacionRutina rutina = rutinaRepository.findById(rutinaId)
                .orElseThrow(() -> new RuntimeException("Rutina no encontrada"));

        List<Ejercicio> ejercicios = ejercicioRepository.findAllById(ejerciciosIds);
        rutina.getEjercicios().addAll(ejercicios);

        return rutinaRepository.save(rutina);
    }

    public List<PublicacionRutina> buscarPorObjetivo(String objetivo) {
        return rutinaRepository.findByObjetivoIgnoreCaseContaining(objetivo);
    }

}
