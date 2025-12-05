package com.raunak.FirstProject.config;

import java.util.List;
import com.raunak.FirstProject.model.Doctor;
import com.raunak.FirstProject.model.Patient;
import lombok.Data;

@Data
public class SeedData {
    private List<Doctor> doctors;
    private List<Patient> patients;
    // here what you want to ad further     
}
