package com.project.harmonie_e_commerce.service;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.project.harmonie_e_commerce.dto.EmailDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(EmailDTO email) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("harmonie.ecommerce@gmail.com");
            helper.setTo(email.getToEmail());
            helper.setSubject(email.getSubject());
            helper.setText(email.getBody());
            javaMailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error sending email");
        }
    }

    public String changeFormatDay(LocalDateTime input) {
        return input.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}