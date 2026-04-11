package com.example.qly_kho.service.application;

import com.example.qly_kho.dto.request.user.UserCreateRequest;
import com.example.qly_kho.dto.request.user.UserSearchRequest;
import com.example.qly_kho.dto.response.PageResponse;
import com.example.qly_kho.dto.response.user.UserResponse;

public interface UserApplicationService {

    // get user list
    PageResponse<UserResponse> getUserList(UserSearchRequest request);

    void createUser(UserCreateRequest request);
}
