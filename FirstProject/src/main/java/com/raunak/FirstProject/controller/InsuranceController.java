package com.raunak.FirstProject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.raunak.FirstProject.model.Insurance;
import com.raunak.FirstProject.model.Patient;
import com.raunak.FirstProject.service.InsuranceService;

import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/api/insurance")
@RequiredArgsConstructor
public class InsuranceController {

    private final InsuranceService insuranceService;

    // Existing POST and DELETE
    @PostMapping("/insurance/{patientId}")
    public ResponseEntity<Patient> assignInsuranceToPatient(
            @PathVariable Long patientId,
            @RequestBody Insurance insurance) {
        Patient updatedPatient = insuranceService.assignInsuranceToPatient(insurance, patientId);
        return ResponseEntity.ok(updatedPatient);
    }

    @DeleteMapping("/disconnect/{patientId}")
    public ResponseEntity<String> disconnectInsurance(@PathVariable Long patientId) {
        insuranceService.disconnectInsuranceFromPatient(patientId);
        return ResponseEntity.ok("Insurance removed from patient with ID " + patientId);
    }

    // ADD THIS METHOD
    @GetMapping("/{patientId}")
    public ResponseEntity<Patient> getPatientInsurance(@PathVariable Long patientId) {
        Patient patient = insuranceService.findPatientWithInsurance(patientId); // create this in service
        return ResponseEntity.ok(patient);
    }
}

// GET http://localhost:8080/api/insurance/1   → returns JSON of patient + insurance
// POST http://localhost:8080/api/insurance/insurance/1   → assign
// DELETE http://localhost:8080/api/insurance/disconnect/1   → remove