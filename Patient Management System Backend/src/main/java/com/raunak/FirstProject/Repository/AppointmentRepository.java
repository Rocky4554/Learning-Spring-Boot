package com.raunak.FirstProject.Repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import com.raunak.FirstProject.model.Appointments;

import jakarta.persistence.LockModeType;
import org.springframework.data.repository.query.Param;


public interface AppointmentRepository extends JpaRepository<Appointments, Long> {
     @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT a FROM Appointments a WHERE a.doctor.id = :doctorId AND a.appointmentTime = :time")
    Appointments findExistingAppointmentForDoctor(
            @Param("doctorId") Long doctorId,
            @Param("time") LocalDateTime time
    );

}
