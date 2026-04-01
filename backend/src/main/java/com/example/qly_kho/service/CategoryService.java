package com.example.qly_kho.service;

import com.example.qly_kho.dto.request.category.CreateCategoryRequest;
import com.example.qly_kho.dto.response.CategoryResponse;

public interface CategoryService {

    //tạo category
    CategoryResponse createCategory(CreateCategoryRequest request);
}
