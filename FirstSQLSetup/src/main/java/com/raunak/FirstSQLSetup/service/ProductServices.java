package com.raunak.FirstSQLSetup.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.raunak.FirstSQLSetup.model.Product;
import com.raunak.FirstSQLSetup.Repository.ProductRepo;

@Service
public class ProductServices {
    @Autowired
    ProductRepo repository;

    // List<Product> products = new ArrayList<>(Arrays.asList(
    //     new Product(101, "Iphone", 50000),
    //     new Product(102, "Canon Camera", 70000),
    //     new Product(103, "Shure Mic", 10000)
    // ));

    // fetching all products
    public List<Product> getProducts() {
        // return products;
        return repository.findAll();
    }

    public Product getProductById(int prodId) {
        // return products.stream()
        //     .filter(p -> p.getProdId() == prodId)
        //     .findFirst()
        //     .orElse(null);

        return repository.findById(prodId).orElse(new Product());
    }

    public void addProduct(Product prod) {
        // products.add(prod);
        repository.save(prod);
    }

    // UPDATE product
    public void updateProduct(int prodId, Product updatedProduct) {
        // for (int i = 0; i < products.size(); i++) {
        //     Product p = products.get(i);
        //     if (p.getProdId() == prodId) {
        //         products.set(i, updatedProduct);
        //         return;
        //     }
        // }

        repository.save(updatedProduct);
    }

    // DELETE product
    public void deleteProduct(int prodId) {
        // products.removeIf(p -> p.getProdId() == prodId);

        repository.deleteById(prodId);
    }
}
