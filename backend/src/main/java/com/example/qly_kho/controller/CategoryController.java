package com.example.qly_kho.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.qly_kho.dto.request.category.CreateCategoryRequest;
import com.example.qly_kho.service.CategoryService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {
    
    private final CategoryService categoryService;

    @PreAuthorize("hasAuthority('CATEGORY_CREATE')")
    @PostMapping("/add")
    public ResponseEntity<Void> createCategory(@RequestBody @Valid CreateCategoryRequest request) {
        categoryService.createCategory(request);
        return ResponseEntity.ok().build();
    }
}
