package com.raunak.FirstProject.service;
import com.raunak.FirstProject.Repository.PatientRepository;
import com.raunak.FirstProject.controller.PatientController;
import com.raunak.FirstProject.model.Patient;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PatientService {
    @Autowired
    PatientRepository repository;

    // List<Product> products = new ArrayList<>(Arrays.asList(
    //     new Product(101, "Iphone", 50000),
    //     new Product(102, "Canon Camera", 70000),
    //     new Product(103, "Shure Mic", 10000)
    // ));

    // fetching all products
    public List<Patient> getProducts() {
        // return products;
        return repository.findAll();
    }
 // finding my name using JPQL method
     public Patient getProductsByName(String name) {
        
        return repository.findByName(name);
    }

    public Patient getProductById(int prodId) {
        // return products.stream()
        //     .filter(p -> p.getProdId() == prodId)
        //     .findFirst()
        //     .orElse(null);

        return repository.findById((long)prodId).orElse(new Patient());
    }

    public void addProduct(Patient prod) {
        // products.add(prod);
        repository.save(prod);
    }

     public void saveALL(List<Patient> patients) {
        repository.saveAll(patients);
    }

    // UPDATE product
    public void updateProduct(int prodId, Patient updatedProduct) {
        // for (int i = 0; i < products.size(); i++) {
        //     Product p = products.get(i);
        //     if (p.getProdId() == prodId) {
        //         products.set(i, updatedProduct);
        //         return;
        //     }
        // }

        repository.save(updatedProduct);
    }

    // DELETE product
    public void deleteProduct(int prodId) {
        // products.removeIf(p -> p.getProdId() == prodId);

        repository.deleteById((long)prodId);
}

 public void deleteAllPatients() {
        repository.deleteAll();
    }
}
