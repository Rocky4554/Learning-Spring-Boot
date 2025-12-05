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

public class InsuranceServices {

    private final InsuranceRepository insuranceRepository;
    private final PatientRepository patientRepository;
    
    @Transactional
    public Patient assignInsurnaceToPatient(Insurance insurance, Long patientid){

        Patient patient = patientRepository.findById(patientid).orElseThrow(()-> new EntityNotFoundException("Patient not found with id "+ patientid));

        patient.setInsurance(insurance);
        insurance.setPatient(patient);

        return patient; 
    }

    @Transactional
    public Patient disconnectInsuranceFromPatient(Long patientid){
        Patient patient = patientRepository.findById(patientid).orElseThrow(()-> new EntityNotFoundException("patient not found"));
        patient.setInsurance(null);

        return patient;
    }

}
