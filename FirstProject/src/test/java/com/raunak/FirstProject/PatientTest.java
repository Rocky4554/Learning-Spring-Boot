package com.raunak.FirstProject;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.raunak.FirstProject.Repository.PatientRepository;
import com.raunak.FirstProject.model.Patient;

@SpringBootTest
public class PatientTest {

    @Autowired
    private PatientRepository patientRepository;

    @Test
    public void testPatientRepository() {
        // Test logic for creating a Patient instance

       List<Patient> result= patientRepository.findAll();
       System.out.println("Patients: "+result);

    }

}
