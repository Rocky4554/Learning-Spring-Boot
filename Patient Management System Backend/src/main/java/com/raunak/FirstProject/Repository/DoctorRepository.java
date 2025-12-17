package com.raunak.FirstProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raunak.FirstProject.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor,Long>{

}
