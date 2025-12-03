package com.raunak.FirstSQLSetup.controller;

import com.raunak.FirstSQLSetup.model.Product;
import com.raunak.FirstSQLSetup.service.ProductServices;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProductController {

    @Autowired
    ProductServices object;

    @GetMapping("/products")
    public List<Product> getProducts(){
        return object.getProducts();
    }

    @GetMapping("/products/{prodId}")
    public Product getProductById(@PathVariable int prodId) {
        return object.getProductById(prodId);
    }

    @PostMapping("/products")
    public String addProduct(@RequestBody Product prod) {
       object.addProduct(prod);
       return "Product added successfully!";
    }

    // UPDATE Product
    @PutMapping("/products/{prodId}")
    public String updateProduct(@PathVariable int prodId, @RequestBody Product prod) {
        object.updateProduct(prodId, prod);
        return "Product updated successfully!";
    }

    // DELETE Product
    @DeleteMapping("/products/{prodId}")
    public String deleteProduct(@PathVariable int prodId) {
        object.deleteProduct(prodId);
        return "Product deleted successfully!";
    }
}
