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
public Appointments createNewAppointment(Appointments appointments , Long doctorId , Long patientId){

    Doctor doctor = doctorRepository.findById(doctorId)
            .orElseThrow(() -> new EntityNotFoundException("Doctor not found with id " + doctorId));

    Patient patient = patientRepository.findById(patientId)
            .orElseThrow(() -> new EntityNotFoundException("Patient not found with id " + patientId));

    if (appointments.getId() != null) {
        throw new IllegalArgumentException("New appointment must not contain an ID");
    }

    // 🔒 Check locking to prevent double booking
    Appointments existing = appointmentRepository
            .findExistingAppointmentForDoctor(doctorId, appointments.getAppointmentTime());

    if (existing != null) {
        throw new IllegalStateException("This doctor is already booked for this time slot");
    }

    // Set doctor and patient
    appointments.setDoctor(doctor);
    appointments.setPatient(patient);

    // Link patient
    patient.getAppointments().add(appointments);

    return appointmentRepository.save(appointments);
}

}
