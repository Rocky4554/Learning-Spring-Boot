package com.raunak.FirstProject;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.raunak.FirstProject.model.Appointments;
import com.raunak.FirstProject.service.AppointentsService;

@SpringBootTest
public class AppointmentTest {

    @Autowired
    private AppointentsService appointentsService;

    @Test
    public void testCreateAppointments() {
        Appointments appointment = Appointments.builder()
                .appointmentTime(LocalDateTime.of(2025, 11, 1, 14, 0))
                .reason("Cancer")
                .build();

        var created = appointentsService.createNewAppointment(appointment, 1L, 1L);
        System.out.println(created);
    }
}
