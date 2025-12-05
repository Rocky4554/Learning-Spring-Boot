package com.raunak.FirstProject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.raunak.FirstProject.model.Insurance;
import com.raunak.FirstProject.model.Patient;
import com.raunak.FirstProject.service.InsuranceServices;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/insurance")
@RequiredArgsConstructor
public class InsuranceController {

    private final InsuranceServices insuranceServices;

    // Assign insurance to patient
    @PostMapping("/assign/{patientId}")
    public ResponseEntity<Patient> assignInsuranceToPatient(
            @PathVariable Long patientId,
            @RequestBody Insurance insurance) {

        Patient updatedPatient = insuranceServices.assignInsurnaceToPatient(insurance, patientId);

        return ResponseEntity.ok(updatedPatient);
    }

    // Disconnect insurance from patient
    @DeleteMapping("/disconnect/{patientId}")
    public ResponseEntity<String> disconnectInsurance(@PathVariable Long patientId) {

        insuranceServices.disconnectInsuranceFromPatient(patientId);

        return ResponseEntity.ok("Insurance removed from patient with ID " + patientId);
    }
}
