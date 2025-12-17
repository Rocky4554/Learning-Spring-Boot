package com.raunak.FirstProject.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final JavaMailSender mailSender;

    @Async("notificationExecutor")
    public void sendInsuranceAddedNotification(String patientEmail, String insuranceName) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(patientEmail);
        message.setSubject("Insurance Added Successfully");
        message.setText("Your insurance '" + insuranceName + "' has been added!");

        mailSender.send(message);

        System.out.println("Email sent to " + patientEmail);
    }
}
