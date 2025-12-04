package com.raunak.FirstProject.controller;

import com.raunak.FirstProject.service.PatientService;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raunak.FirstProject.model.Patient;

@RestController
@RequestMapping("/api")
public class PatientController {

    @RequestMapping("/")
    public String home() {
        return "Hello Welcome to Namekraft";
    }

    @Autowired
    PatientService object;

    // GET ALL Patients
    @GetMapping("/products")
    public List<Patient> getProducts() {
        return object.getProducts();
    }

    // GET Patient by ID
    @GetMapping("/products/{prodId}")
    public Patient getProductById(@PathVariable int prodId) {
        return object.getProductById(prodId);

    }

    @GetMapping("/products/name/{name}")
    public Patient getProductsByName(@PathVariable String name) {
        return object.getProductsByName(name);
    }

    // ADD Single Patient
    @PostMapping("/product")
    public String addProduct(@RequestBody Patient prod) {
        object.addProduct(prod);
        return "Product added successfully!";
    }

    // ADD Multiple Patients
    @PostMapping("/patients")
    public String addPatients(@RequestBody List<Patient> patients) {
        object.saveALL(patients);
        return "Patients list added successfully!";
    }

    // UPDATE Product
    @PutMapping("/products/{prodId}")
    public String updateProduct(@PathVariable int prodId, @RequestBody Patient prod) {
        object.updateProduct(prodId, prod);
        return "Product updated successfully!";
    }

    // DELETE Product
    @DeleteMapping("/products/{prodId}")
    public String deleteProduct(@PathVariable int prodId) {
        object.deleteProduct(prodId);
        return "Product deleted successfully!";
    }

      @DeleteMapping("/patients")
    public String deleteAllPatients() {
        object.deleteAllPatients();
        return "All patients deleted successfully!";
    }
}
