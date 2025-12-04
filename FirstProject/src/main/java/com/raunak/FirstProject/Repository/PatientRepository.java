package com.raunak.FirstProject.Repository;

import java.util.List;

import org.springframework.boot.data.autoconfigure.web.DataWebProperties.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.raunak.FirstProject.model.BloodGroupCount;
import com.raunak.FirstProject.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    Patient findByName(String name);

    @Query("SELECT new com.raunak.FirstProject.model.BloodGroupCount(p.bloodGroup, COUNT(p)) " +
           "FROM Patient p GROUP BY p.bloodGroup")
    List<BloodGroupCount> countPatientsByBloodGroup(Pageable pageable);
}
