package com.raunak.FirstProject.service;

import org.springframework.stereotype.Service;

import com.raunak.FirstProject.Repository.InsuranceRepository;
import com.raunak.FirstProject.Repository.PatientRepository;
import com.raunak.FirstProject.model.Insurance;
import com.raunak.FirstProject.model.Patient;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import jakarta.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class InsuranceService {

    private final InsuranceRepository insuranceRepository;
    private final PatientRepository patientRepository;
    private final NotificationService notificationService;

    // -------------------------
    // ADD INSURANCE TO PATIENT
    // -------------------------
    @Transactional
    public Patient assignInsuranceToPatient(Insurance insurance, Long patientId) {

        Patient patient = patientRepository.findById(patientId)
            .orElseThrow(() -> new EntityNotFoundException("Patient not found with id " + patientId));

        // link
        insurance.setPatient(patient);
        patient.getInsurances().add(insurance);

        // Save insurance only (patient auto-updated)
        insuranceRepository.save(insurance);

        // Send async email
        notificationService.sendInsuranceAddedNotification(
                patient.getEmail(), 
                insurance.getPolicyNumber()
        );

        return patient;
    }

    // -----------------------------------
    // REMOVE SPECIFIC INSURANCE FROM PATIENT
    // -----------------------------------
    @Transactional
    public Patient disconnectInsuranceFromPatient(Long patientId, Long insuranceId) {

        Patient patient = patientRepository.findById(patientId)
            .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

        Insurance insurance = insuranceRepository.findById(insuranceId)
            .orElseThrow(() -> new EntityNotFoundException("Insurance not found"));

        if (!insurance.getPatient().getId().equals(patientId)) {
            throw new IllegalStateException("This insurance does not belong to this patient");
        }

        // unlink both sides
        patient.getInsurances().remove(insurance);
        insurance.setPatient(null);

        insuranceRepository.delete(insurance);

        return patient;
    }

    // Simple create insurance
    @Transactional
    public Insurance createInsurance(Insurance insurance) {
        return insuranceRepository.save(insurance);
    }

    // Load patient with all insurances
    public Patient findPatientWithInsurance(Long patientId) {
        return patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));
    }

    @Transactional
public Patient disconnectAllInsurances(Long patientId) {

    Patient patient = patientRepository.findById(patientId)
            .orElseThrow(() -> new EntityNotFoundException("Patient not found"));

    // delete each insurance
    for (Insurance insurance : patient.getInsurances()) {
        insurance.setPatient(null);
        insuranceRepository.delete(insurance);  // <-- FIXED
    }

    patient.getInsurances().clear();

    return patient;
}

}

