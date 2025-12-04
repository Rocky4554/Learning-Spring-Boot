package com.raunak.FirstProject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.raunak.FirstProject.model.Appointments;
import com.raunak.FirstProject.service.AppointentsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointentsService appointentsService;

    @PostMapping("/create/{doctorId}/{patientId}")
    public ResponseEntity<String> createAppointment(
            @RequestBody Appointments appointments,
            @PathVariable Long doctorId,
            @PathVariable Long patientId) {

        appointentsService.createNewAppointment(appointments, doctorId, patientId);

        return ResponseEntity.ok("Appointment created successfully");
    }
}

