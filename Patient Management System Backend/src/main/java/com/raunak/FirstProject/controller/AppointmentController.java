package com.raunak.FirstProject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.raunak.FirstProject.DTO.ApiResponseDTO;
import com.raunak.FirstProject.model.Appointments;
import com.raunak.FirstProject.service.AppointentsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointentsService appointentsService;

   @PostMapping("/create/{doctorId}/{patientId}")
public ResponseEntity<ApiResponseDTO<Appointments>> createAppointment(
        @RequestBody Appointments appointments,
        @PathVariable Long doctorId,
        @PathVariable Long patientId) {

    Appointments savedAppointment =
            appointentsService.createNewAppointment(appointments, doctorId, patientId);

    ApiResponseDTO<Appointments> response = new ApiResponseDTO<>(
            true,
            "Appointment created successfully",
            savedAppointment,
            200
    );

    return ResponseEntity.ok(response);
}

}

