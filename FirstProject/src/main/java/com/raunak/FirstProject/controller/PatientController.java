package com.raunak.FirstProject.controller;

import com.raunak.FirstProject.service.PatientService;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.raunak.FirstProject.DTO.ApiResponseDTO;
import com.raunak.FirstProject.DTO.PatientDTO;
import com.raunak.FirstProject.DTOMapper.PatientMapper;
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
    // @GetMapping("/patients")
    // public List<Patient> getProducts() {
    // return object.getProducts();
    // }

    @GetMapping("/patients")
    public List<PatientDTO> getAllPatients() {
        List<Patient> patients = object.getProducts(); // your service call
        return patients.stream()
                .map(PatientMapper::toPatientDTO)
                .toList();
    }

    // GET Patient by ID
    @GetMapping("/patient/{prodId}")
    public ResponseEntity<PatientDTO> getProductById(@PathVariable int prodId) {
        Patient patient = object.getProductById(prodId);
        PatientDTO dto = PatientMapper.toPatientDTO(patient);
        return ResponseEntity.ok(dto);

    }

    @GetMapping("/patient/email")
    public Patient getProductsByEmail(@RequestParam String email) {
        return object.getProductsByEmail(email);
    }

    // ADD Single Patient
    // @PostMapping("/patient")
    // public String addProduct(@RequestBody Patient prod) {
    // object.addProduct(prod);
    // return "Patient added successfully!";
    // }

    @PostMapping("/patient")
    public ResponseEntity<ApiResponseDTO<Patient>> addPatient(@RequestBody Patient prod) {
        try {
            Patient savedPatient = object.addProduct(prod);

            ApiResponseDTO<Patient> response = new ApiResponseDTO<>(
                    true,
                    "Patient added successfully!",
                    savedPatient,
                    HttpStatus.OK.value());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            ApiResponseDTO<Patient> errorResponse = new ApiResponseDTO<>(
                    false,
                    "Failed to add patient: " + e.getMessage(),
                    null,
                    HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse);
        }
    }

    // ADD Multiple Patients
    @PostMapping("/patients")
    public String addPatients(@RequestBody List<Patient> patients) {
        object.saveALL(patients);
        return "Patients list added successfully!";
    }

    // UPDATE Product
    @PutMapping("/patient/{prodId}")
    public String updateProduct(@PathVariable int prodId, @RequestBody Patient prod) {
        object.updateProduct(prodId, prod);
        return "Product updated successfully!";
    }

    // DELETE Product
    @DeleteMapping("/patient/{prodId}")
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
