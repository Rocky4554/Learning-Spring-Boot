package com.raunak.FirstProject.DTOMapper;

import java.util.stream.Collectors;

import com.raunak.FirstProject.DTO.*;
import com.raunak.FirstProject.model.*;

public class PatientMapper {

    public static PatientDTO toPatientDTO(Patient patient) {
        if (patient == null) return null;

        PatientDTO dto = new PatientDTO();

        dto.setId(patient.getId());
        dto.setName(patient.getName());
        dto.setEmail(patient.getEmail());
        dto.setDateofBirth(patient.getDateofBirth());
        dto.setGender(patient.getGender());
        dto.setBloodGroup(patient.getBloodGroup());
        dto.setCreatedAt(patient.getCreatedAt());

        // map Insurances (ONE-to-MANY)
        if (patient.getInsurances() != null) {
            dto.setInsurances(
                patient.getInsurances().stream()
                    .map(PatientMapper::toInsuranceDTO)
                    .collect(Collectors.toList())
            );
        }

        // map Appointments (ONE-to-MANY)
        if (patient.getAppointments() != null) {
            dto.setAppointments(
                patient.getAppointments().stream()
                    .map(PatientMapper::toAppointmentDTO)
                    .collect(Collectors.toList())
            );
        }

        return dto;
    }

    public static AppointmentDTO toAppointmentDTO(Appointments appt) {
        if (appt == null) return null;
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appt.getId());
        dto.setAppointmentTime(appt.getAppointmentTime());
        dto.setReason(appt.getReason());
        return dto;
    }

    public static InsuranceDTO toInsuranceDTO(Insurance insurance) {
        if (insurance == null) return null;
        InsuranceDTO dto = new InsuranceDTO();
        dto.setId(insurance.getId());
        dto.setPolicyNumber(insurance.getPolicyNumber());
        dto.setProvider(insurance.getProvider());
        dto.setValidUntill(insurance.getValidUntill());
        return dto;
    }
}
