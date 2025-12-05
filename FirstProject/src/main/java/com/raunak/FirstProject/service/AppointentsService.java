package com.raunak.FirstProject.service;

import org.springframework.stereotype.Service;

import com.raunak.FirstProject.Repository.AppointmentRepository;
import com.raunak.FirstProject.Repository.DoctorRepository;
import com.raunak.FirstProject.Repository.PatientRepository;
import com.raunak.FirstProject.model.Appointments;
import com.raunak.FirstProject.model.Doctor;
import com.raunak.FirstProject.model.Patient;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor

public class AppointentsService {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    @Transactional
    public Appointments createNewAppointment(Appointments appointments , Long doctorid , Long patientid){
        Doctor doctor = doctorRepository.findById(doctorid).orElseThrow(()-> new EntityNotFoundException("Doctor not found with id"+doctorid));
        Patient patient = patientRepository.findById(patientid).orElseThrow(()-> new EntityNotFoundException("Patient not found with id"+patientid));

        if(appointments.getId()!= null) throw new IllegalArgumentException("Appointment should not have");

        appointments.setDoctor(doctor);
        appointments.setPatient(patient);

        patient.getAppointments().add(appointments);

        return appointmentRepository.save(appointments);
 
    }

}
