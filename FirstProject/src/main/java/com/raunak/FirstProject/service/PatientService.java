package com.raunak.FirstProject.service;

import com.raunak.FirstProject.Repository.PatientRepository;
import com.raunak.FirstProject.model.Insurance;
import com.raunak.FirstProject.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PatientService {

    @Autowired
    PatientRepository repository;

    @Autowired
    InsuranceService insuranceService;

    public List<Patient> getProducts() {
        return repository.findAll();
    }

    public Patient getProductsByEmail(String email) {
        return repository.findByEmail(email);
    }

    public Patient getProductById(int prodId) {
        return repository.findById((long) prodId)
                .orElse(new Patient());
    }

    public Patient addProduct(Patient prod) {
        // Automatically create insurance if not provided
        // if (prod.getInsurance() == null) {
        //     Insurance insurance = new Insurance();
        //     insurance.setPatient(prod);
        //     Insurance created = insuranceService.createInsurance(insurance);
        //     prod.setInsurance(created);
        // }

        return repository.save(prod);
    }

    public List<Patient> saveALL(List<Patient> patients) {
        List<Patient> toSave = new ArrayList<>();
        // for (Patient patient : patients) {
        //     if (patient.getInsurance() == null) {
        //         Insurance insurance = new Insurance();
        //         insurance.setPatient(patient);
        //         Insurance created = insuranceService.createInsurance(insurance);
        //         patient.setInsurance(created);
        //     }
        //     toSave.add(patient);
        // }
        return repository.saveAll(toSave);
    }

    public void updateProduct(int prodId, Patient updatedProduct) {
        repository.save(updatedProduct);
    }

    public void deleteProduct(int prodId) {
        repository.deleteById((long) prodId);
    }

    public void deleteAllPatients() {
        repository.deleteAll();
    }
}
