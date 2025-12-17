package com.raunak.FirstProject.config;

import java.io.InputStream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import com.raunak.FirstProject.Repository.DoctorRepository;
import com.raunak.FirstProject.Repository.PatientRepository;

@Component
public class DataSeeder implements CommandLineRunner {

    private final DoctorRepository doctorRepo;
    private final PatientRepository patientRepo;

    public DataSeeder(DoctorRepository doctorRepo, PatientRepository patientRepo) {
        this.doctorRepo = doctorRepo;
        this.patientRepo = patientRepo;
    }

    @Override
    public void run(String... args) throws Exception {

        // Skip if already seeded
        if (doctorRepo.count() > 0 || patientRepo.count() > 0) {
            System.out.println("Skipping seeding (data already present)");
            return;
        }

        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());  // ⭐ FIX: Enable LocalDate support

        // Correct resource location
        InputStream is = getClass().getResourceAsStream("/data/seed.json");

        if (is == null) {
            System.out.println("❌ seed.json NOT FOUND! Make sure it is inside: src/main/resources/data/");
            return;
        }

        SeedData seedData = mapper.readValue(is, SeedData.class);

        // Save doctors
        if (seedData.getDoctors() != null && !seedData.getDoctors().isEmpty()) {
            doctorRepo.saveAll(seedData.getDoctors());
        }

        // Save patients
        if (seedData.getPatients() != null && !seedData.getPatients().isEmpty()) {
            patientRepo.saveAll(seedData.getPatients());
        }

        System.out.println("✅ Database Seeded Successfully!");
    }
}
