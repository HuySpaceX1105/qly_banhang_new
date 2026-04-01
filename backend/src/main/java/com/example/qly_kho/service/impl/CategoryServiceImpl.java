package com.example.qly_kho.service.impl;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.qly_kho.constant.ActionConstants;
import com.example.qly_kho.dto.request.category.CreateCategoryRequest;
import com.example.qly_kho.dto.response.CategoryResponse;
import com.example.qly_kho.entity.Category;
import com.example.qly_kho.exception.custom.DuplicateException;
import com.example.qly_kho.repository.CategoryRepository;
import com.example.qly_kho.security.cache.UserCache;
import com.example.qly_kho.service.ActivityLogService;
import com.example.qly_kho.service.CategoryService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CategoryServiceImpl implements CategoryService {
    
    private final CategoryRepository categoryRepository;
    private final ActivityLogService activityLogService;
    @Override
    public CategoryResponse createCategory(CreateCategoryRequest request) {

        if(categoryRepository.existsByName(request.name())) {
            throw new DuplicateException(
                String.format("Category with (name: %s) already exists", request.name())
            );
        }

        Category category = Category.createCategory(request.name(), request.description());
        try {

            Category savedCategory = categoryRepository.save(category);

            UserCache user = (UserCache) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

            activityLogService.logActivity(
                user.getId(), 
                ActionConstants.CREATE, 
                ActionConstants.ENTITY_CATEGORY, 
                savedCategory.getId(), 
                "Category created successfully", 
                "127.0.0.1"
            );
            return new CategoryResponse(
                savedCategory.getId(),
                savedCategory.getName(),
                savedCategory.getDescription(),
                savedCategory.getCreatedAt(),
                savedCategory.getUpdatedAt()
            );

        } catch (DataIntegrityViolationException e) {
           throw new DuplicateException(
                String.format("Category with (name: %s) already exists", request.name())
            );
        }
    }
}
