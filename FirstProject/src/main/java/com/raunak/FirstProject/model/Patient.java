package com.raunak.FirstProject.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Entity
@NoArgsConstructor
@ToString
@Getter
@Setter
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
            columnList = "name,email"
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

    @ToString.Exclude
    private String gender;

    private String bloodGroup;  

    @CreationTimestamp
    @Column(updatable=false)
    private LocalDateTime createdAt;
}
