package com.raunak.FirstSQLSetup.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.raunak.FirstSQLSetup.model.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

}
