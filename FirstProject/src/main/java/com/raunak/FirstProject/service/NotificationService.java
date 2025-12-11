package com.raunak.FirstProject.service;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Async
    public void sendInsuranceAddedNotification(String patientEmail, String insuranceName) {

        System.out.println("Sending notification to: " + patientEmail);

        try {
            Thread.sleep(5000); // simulate delay - email or SMS sending
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        System.out.println("Notification sent about insurance: " + insuranceName);
    }
}
