package com.raunak.FirstProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raunak.FirstProject.model.Appointments;

public interface AppointmentRepository extends JpaRepository<Appointments, Long> {

}
