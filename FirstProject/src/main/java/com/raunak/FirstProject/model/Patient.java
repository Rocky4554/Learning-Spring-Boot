package com.raunak.FirstProject.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@ToString(exclude = {"insurance", "appointments"})   // <-- FIXED
@Table(
    name="patient",
    uniqueConstraints = {
        @UniqueConstraint(
            name="unique_email_constraint",
            columnNames = {"email"}
        )
    },
    indexes={
        @jakarta.persistence.Index(
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

    @CreationTimestamp
    @Column(updatable=false)
    private LocalDateTime createdAt;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="patient_insurance_id")
    private Insurance insurance;

    @OneToMany(
        mappedBy = "patient",
        cascade = CascadeType.REMOVE,
        orphanRemoval = true,
        fetch = FetchType.EAGER
    )
    private List<Appointments> appointments = new ArrayList<>();
}
