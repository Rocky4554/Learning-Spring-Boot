package com.raunak.FirstProject.service;

import com.raunak.FirstProject.Repository.PatientRepository;
import com.raunak.FirstProject.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    PatientRepository repository;

    public List<Patient> getProducts() {
        return repository.findAll();
    }

    public Patient getProductsByName(String name) {
        return repository.findByName(name);
    }

    public Patient getProductById(int prodId) {
        return repository.findById((long) prodId)
                .orElse(new Patient());
    }

    public Patient addProduct(Patient prod) {
       return repository.save(prod);
    }

    public List<Patient> saveALL(List<Patient> patients) {
       return repository.saveAll(patients);
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
