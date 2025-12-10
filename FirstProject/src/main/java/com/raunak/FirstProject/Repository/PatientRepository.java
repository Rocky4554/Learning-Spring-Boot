package com.raunak.FirstProject.Repository;

import java.util.List;

import org.springframework.data.domain.Pageable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.raunak.FirstProject.model.BloodGroupCount;
import com.raunak.FirstProject.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    @Query("SELECT p FROM Patient p WHERE p.email = :email")
    Patient findByEmail(@Param("email") String email);

    @Query("SELECT new com.raunak.FirstProject.model.BloodGroupCount(p.bloodGroup, COUNT(p)) " +
            "FROM Patient p GROUP BY p.bloodGroup")
    List<BloodGroupCount> countPatientsByBloodGroup(Pageable pageable);

    // @Query("SELECT p FROM Patient p LEFT JOIN FETCH p.appointments")
    // List<Patient> findAllPatientWihtAppoitment();

    @Query(value = """
            SELECT *
            FROM patient p
            LEFT JOIN appointments a
            ON p.id = a.patient_id
            """, nativeQuery = true)
    List<Patient> findAllPatientWihtAppoitment();
}
