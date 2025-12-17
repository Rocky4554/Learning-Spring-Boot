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

    // ✅ Add (Assign) insurance to patient
    @PostMapping("/{patientId}")
    public ResponseEntity<Patient> assignInsurance(
            @PathVariable Long patientId,
            @RequestBody Insurance insurance) {

        Patient updated = insuranceService.assignInsuranceToPatient(insurance, patientId);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete a specific insurance of a patient
    @DeleteMapping("/{patientId}/{insuranceId}")
    public ResponseEntity<String> deleteSpecificInsurance(
            @PathVariable Long patientId,
            @PathVariable Long insuranceId) {

        insuranceService.disconnectInsuranceFromPatient(patientId, insuranceId);
        return ResponseEntity.ok(
                "Deleted insurance " + insuranceId + " from patient " + patientId
        );
    }

    // ✅ Delete ALL insurances of a patient
    @DeleteMapping("/all/{patientId}")
    public ResponseEntity<String> deleteAllInsurances(@PathVariable Long patientId) {
        insuranceService.disconnectAllInsurances(patientId);
        return ResponseEntity.ok("All insurances removed from patient " + patientId);
    }

    // ✅ Get patient + all insurances
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<Patient> getPatientInsurance(@PathVariable Long patientId) {
        Patient patient = insuranceService.findPatientWithInsurance(patientId);
        return ResponseEntity.ok(patient);
    }
}
