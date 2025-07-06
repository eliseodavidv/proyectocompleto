package com.example.demo.PublicacionProgreso.domain;

import com.example.demo.Progreso.domain.Progreso;
import com.example.demo.Progreso.infrastructure.ProgresoRepository;
import com.example.demo.PublicacionProgreso.infrastructure.PublicacionProgresoRepository;
import com.example.demo.user.domain.User;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class PublicacionProgresoService {

    private final PublicacionProgresoRepository pubRepo;
    private final ProgresoRepository progresoRepo;

    public PublicacionProgresoService(PublicacionProgresoRepository pubRepo, ProgresoRepository progresoRepo) {
        this.pubRepo = pubRepo;
        this.progresoRepo = progresoRepo;
    }

    public PublicacionProgreso crearPublicacion(User user, Date inicio, Date fin) {
        List<Progreso> progresos = progresoRepo.findByUserAndFechaBetween(user, inicio, fin);

        if (progresos.isEmpty()) throw new RuntimeException("No hay progresos en ese rango");

        double promedio = progresos.stream().mapToDouble(Progreso::getPeso).average().orElse(0);

        PublicacionProgreso pub = new PublicacionProgreso();
        pub.setUser(user);
        pub.setFechaInicio(inicio);
        pub.setFechaFin(fin);
        pub.setPromedioPeso(promedio);
        pub.setProgresos(progresos);

        return pubRepo.save(pub);
    }
}
