package com.raunak.FirstProject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raunak.FirstProject.model.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

}
