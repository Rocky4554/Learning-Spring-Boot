package com.raunak.FirstProject.DTO;

import java.time.LocalDate;
import lombok.Data;

@Data
public class InsuranceDTO {
    private Long id;
    private String policyNumber;
    private String provider;
    private LocalDate validUntill;
}
