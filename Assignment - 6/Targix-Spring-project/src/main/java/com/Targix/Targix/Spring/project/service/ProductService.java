package com.Targix.Targix.Spring.project.service;

import com.Targix.Targix.Spring.project.DTO.ProductRequest;
import com.Targix.Targix.Spring.project.DTO.ProductResponse;
import com.Targix.Targix.Spring.project.exception.ResourceNotFoundException;
import com.Targix.Targix.Spring.project.model.Category;
import com.Targix.Targix.Spring.project.model.Product;
import com.Targix.Targix.Spring.project.model.User;
import com.Targix.Targix.Spring.project.repo.CategoryRepo;
import com.Targix.Targix.Spring.project.repo.ProductRepo;
import com.Targix.Targix.Spring.project.repo.UserRepo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepo productRepo;
    private final UserRepo userRepo;
    private final CategoryRepo categoryRepo;

    public ProductService(ProductRepo productRepo, UserRepo userRepo, CategoryRepo categoryRepo) {
        this.productRepo = productRepo;
        this.userRepo = userRepo;
        this.categoryRepo = categoryRepo;
    }

    public ProductResponse createProduct(ProductRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = authentication.getName();
        User user = userRepo.findByUserName(loggedInUsername)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Category category = categoryRepo.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Product product = new Product();
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(category);
        product.setUser(user);

        return mapToResponse(productRepo.save(product));
    }

    public List<ProductResponse> getAllProducts() {

        return productRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public ProductResponse getProductById(Integer id) {

        Product product = productRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return mapToResponse(product);
    }

    public List<ProductResponse> getProductsByCategory(String categoryName) {

        return productRepo.findByCategory_Name(categoryName)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<ProductResponse> getProductsByUser(String username) {

        return productRepo.findByUser_UserName(username)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public ProductResponse updateProduct(Integer id, ProductRequest request) throws AccessDeniedException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = authentication.getName();

        Product product = productRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        String productOwner = product.getUser().getUserName();

        if(!productOwner.equals(loggedInUsername) && !isAdmin(authentication)) {
            throw new AccessDeniedException("Your are not allowed to update this product");
        }

        Category category = categoryRepo.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(category);

        return mapToResponse(productRepo.save(product));
    }

    private boolean isAdmin(Authentication authentication) {

        return authentication.getAuthorities().
                stream().anyMatch(a->a.getAuthority().equals("ROLE_ADMIN"));
    }

    public void deleteProduct(Integer id) throws AccessDeniedException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String loggedInUsername = authentication.getName();

        Product product = productRepo.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("product not found"));

        String productOwner = product.getUser().getUserName();
        if(!loggedInUsername.equals(productOwner) && !isAdmin(authentication)) {
            throw new AccessDeniedException("Your are not allowed to update this product");
        }
        productRepo.deleteById(id);
    }

    public List<ProductResponse> searchProducts(String keyword) {

        return productRepo
                .findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                        keyword, keyword
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private ProductResponse mapToResponse(Product product) {

        ProductResponse response = new ProductResponse();
        response.setId(product.getId());
        response.setTitle(product.getTitle());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setCreatedAt(product.getCreatedAt());
        response.setUpdatedAt(product.getUpdatedAt());
        response.setCategoryName(product.getCategory().getName());
        response.setCreatedBy(product.getUser().getUserName());
        return response;
    }
}