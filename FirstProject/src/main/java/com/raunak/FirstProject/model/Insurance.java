package com.raunak.FirstProject.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity

public class Insurance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // automatically increemnt generated id 
    private Long id;

    @Column(nullable=false,unique=true,length=100)
    private String policyNumber;

    @Column(nullable=false , length=100)
    private String provider;

    private LocalDate validUntill;

    @CreationTimestamp // cretae timesatamp autmatically
    @Column(updatable=false, nullable=false) // udatable false means once set cannot be changed
    private LocalDateTime createdAt;

     @JsonIgnore 
    @OneToOne(mappedBy="insurance")
     private Patient patient;
 
}
