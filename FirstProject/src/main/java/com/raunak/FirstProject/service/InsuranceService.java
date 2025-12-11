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

    @Transactional
    public Patient assignInsuranceToPatient(Insurance insurance, Long patientid) {

        Patient patient = patientRepository.findById(patientid)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id " + patientid));

        // SET RELATIONS
        patient.setInsurance(insurance);
        insurance.setPatient(patient);

        // SAVE
        patientRepository.save(patient);

        // 🔥 Send async email to patient
        notificationService.sendInsuranceAddedNotification(
                patient.getEmail(),
                patient.getName()
        );

        // Return updated patient
        return patient;
    }

    @Transactional
    public Patient disconnectInsuranceFromPatient(Long patientid) {
        Patient patient = patientRepository.findById(patientid)
                .orElseThrow(() -> new EntityNotFoundException("patient not found"));
        patient.setInsurance(null);
        patientRepository.save(patient);
        return patient;
    }

    @Transactional
    public Insurance createInsurance(Insurance insurance) {
        return insuranceRepository.save(insurance);
    }

    public Patient findPatientWithInsurance(Long patientId) {
        return patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found"));
    }
}
