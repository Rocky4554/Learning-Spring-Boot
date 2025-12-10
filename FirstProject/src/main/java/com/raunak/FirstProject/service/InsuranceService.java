package com.raunak.FirstProject.service;

import org.springframework.stereotype.Service;

import com.raunak.FirstProject.Repository.InsuranceRepository;
import com.raunak.FirstProject.Repository.PatientRepository;
import com.raunak.FirstProject.model.Insurance;
import com.raunak.FirstProject.model.Patient;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor

public class InsuranceService {

    private final InsuranceRepository insuranceRepository;
    private final PatientRepository patientRepository;

    @Transactional
    public Patient assignInsuranceToPatient(Insurance insurance, Long patientid) {

        Patient patient = patientRepository.findById(patientid)
                .orElseThrow(() -> new EntityNotFoundException("Patient not found with id " + patientid));

        patient.setInsurance(insurance);
        insurance.setPatient(patient);

        // persist changes
        patientRepository.save(patient);

        return patientRepository.findById(patientid).orElse(patient);
    }

    @Transactional
    public Patient disconnectInsuranceFromPatient(Long patientid) {
        Patient patient = patientRepository.findById(patientid)
                .orElseThrow(() -> new EntityNotFoundException("patient not found"));
        patient.setInsurance(null);

        // persist changes
        patientRepository.save(patient);

        return patient;
    }

    @Transactional
    public Insurance createInsurance(Insurance insurance) {
        return insuranceRepository.save(insurance);
    }

}
