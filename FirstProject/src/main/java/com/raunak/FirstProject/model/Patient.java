package com.raunak.FirstProject.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
    name="patient",
    uniqueConstraints = {
        @UniqueConstraint(
            name="unique_email_constraint",
            columnNames = {"email"}
        )
    },
    indexes={
        @Index(
            name="index_name_email",
            columnList = "patient_name,email"
        )
    }
)
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="patient_name", nullable=false, length=100)
    private String name;

    private String email;
    private LocalDate dateofBirth;
    private String gender;
    private String bloodGroup;
    private String location;

    @CreationTimestamp
    @Column(updatable=false)
    private LocalDateTime createdAt;

    @JsonIgnore  
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="patient_insurance_id")
    private Insurance insurance;

    @JsonIgnore  
    @OneToMany(
        mappedBy = "patient",
        cascade = CascadeType.REMOVE,
        orphanRemoval = true,
        fetch = FetchType.EAGER
    )
    private List<Appointments> appointments = new ArrayList<>();
}
