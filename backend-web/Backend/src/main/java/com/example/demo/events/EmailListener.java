//package com.example.demo.events;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.event.EventListener;
//import org.springframework.scheduling.annotation.Async;
//import org.springframework.stereotype.Component;
//
//
//    @Component
//    public class EmailListener {
//        @Autowired
//        private EmailService emailService;
//
//
//        @EventListener
//        @Async
//        public void handleHelloEmailEvent(HelloEmailEvent event) {
//            String htmlBody = "<!DOCTYPE html>\n" +
//                    "<html xmlns:th=\"http://www.thymeleaf.org\">\n" +
//                    "<head>\n" +
//                    "    <meta charset=\"UTF-8\">\n" +
//                    "    <title>Felicidades - Lista de Reproducción Creada</title>\n" +
//                    "</head>\n" +
//                    "<body style=\"font-family: Arial, sans-serif; color: #333;\">\n" +
//                    "<div style=\"max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; text-align: center;\">\n" +
//                    "    <h1 style=\"color: #4A90E2;\">¡Felicidades, <span th:text=\"${name}\">Nombre</span>!</h1>\n" +
//                    "    <p style=\"font-size: 16px; color: #555;\">Tu nueva lista de reproducción ha sido creada exitosamente.</p>\n" +
//                    "    <p style=\"font-size: 16px; color: #555;\">Disfruta de tu música y sigue explorando nuestras recomendaciones.</p>\n" +
//                    "    <a href=\"https://www.tusitio.com/listas\" style=\"display: inline-block; text-decoration: none; color: white; background-color: #4A90E2; padding: 10px 20px; border-radius: 5px; font-weight: bold; margin-top: 20px;\">Ir a mi lista de reproducción</a>\n" +
//                    "</div>\n" +
//                    "</body>\n" +
//                    "</html>\n";
//            emailService.sendHtmlMessage(event.getEmail(), "Correo de Creacion de Lsita de Reproduccion", htmlBody);
//
//        }
//    }
//
//
