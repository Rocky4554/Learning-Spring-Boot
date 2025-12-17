package com.raunak.FirstProject.DTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class PatientDTO {
    private Long id;
    private String name;
    private String email;
    private LocalDate dateofBirth;
    private String gender;
    private String bloodGroup;
    private LocalDateTime createdAt;
    private String location;

    // CHANGED: single insurance → list of insurances
    private List<InsuranceDTO> insurances;

    private List<AppointmentDTO> appointments;
}
