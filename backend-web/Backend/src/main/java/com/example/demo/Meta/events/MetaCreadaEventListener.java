package com.example.demo.Meta.events;

import com.example.demo.Meta.domain.Meta;
import com.example.demo.Meta.infrastructure.MetaRepository;
import com.example.demo.events.EmailService;
import com.example.demo.user.domain.User;
import com.example.demo.user.infrastructure.UserRepository;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class MetaCreadaEventListener {

    private final EmailService emailService;
    private final UserRepository userRepository;

    public MetaCreadaEventListener(EmailService emailService, UserRepository userRepository) {
        this.emailService = emailService;
        this.userRepository = userRepository;
    }

    @EventListener
    public void onMetaCreada(MetaCreadaEvent event) {
        Meta meta = event.getMeta();
        User user = meta.getUser();

        // Aquí, el servicio de email enviará un correo confirmando que la meta fue creada
        emailService.sendHtmlMessage(user.getEmail(), "Meta Creada", meta.getDescripcion());
    }
}
