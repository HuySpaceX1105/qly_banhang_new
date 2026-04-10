package com.example.qly_kho.service.domain;

import com.example.qly_kho.dto.request.category.CreateCategoryRequest;
import com.example.qly_kho.dto.response.category.CategoryResponse;

public interface CategoryService {

    //tạo category
    CategoryResponse createCategory(CreateCategoryRequest request);
}
