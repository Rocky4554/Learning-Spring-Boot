package com.raunak.FirstProject.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.raunak.FirstProject.Repository.DoctorRepository;
import com.raunak.FirstProject.model.Doctor;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public Doctor addDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Doctor not found with id " + id));
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}
