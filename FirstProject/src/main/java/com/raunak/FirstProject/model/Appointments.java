package com.raunak.FirstProject.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter

public class Appointments {
    @Id
    private Long id;

    @Column(nullable = false)
    private LocalDateTime appointmentTime;

    @Column(length=1000)
    private String reason;

    @JoinColumn(name="patient_id", nullable=false) // it is owning the side of relationship, patient is required and not nullbale 
    @ManyToOne // readmme it as many apointments is related to one patient ,no more than one patient can be assoicated with one appointment
    private Patient patient;

    @ManyToOne
    @JoinColumn(name="doctor_id", nullable=false)
    private Doctor doctor;

}
