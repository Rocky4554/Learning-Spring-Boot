package com.raunak.FirstSQLSetup.model;

import jakarta.persistence.Entity;   // JPA annotation to mark this class as a database table
import jakarta.persistence.Id;       // Marks the primary key column of the table
import lombok.AllArgsConstructor;    // Lombok: Generates constructor with all fields
import lombok.Data;                  // Lombok: Generates getters, setters, toString, equals, hashCode
import lombok.NoArgsConstructor;     // Lombok: Generates default (no-args) constructor

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity   // @Entity tells JPA/Hibernate to create a table for this class
public class Product {

    @Id   // @Id marks primary key of the table
    private int prodId;

    private String prodName;
    private int price;
}
