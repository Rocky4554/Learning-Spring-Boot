package com.raunak.FirstProject.DTO;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class AppointmentDTO {
    private Long id;
    private LocalDateTime appointmentTime;
    private String reason;
}

