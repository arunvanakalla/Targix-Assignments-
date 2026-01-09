package com.Targix.Targix.Spring.project.repo;

import com.Targix.Targix.Spring.project.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product , Integer> {
    List<Product> findByCategory_Name(String categoryName);
    List<Product> findByUser_UserName(String userUserName);
    List<Product> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String title,
            String description
    );
}