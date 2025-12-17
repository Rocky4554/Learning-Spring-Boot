package com.raunak.FirstProject.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Entity
@Table(name = "blood_group_count")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class BloodGroupCount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bloodGroup;
    private Long count;

    public BloodGroupCount(String bloodGroup, Long count) {
        this.bloodGroup = bloodGroup;
        this.count = count;
    }
}
