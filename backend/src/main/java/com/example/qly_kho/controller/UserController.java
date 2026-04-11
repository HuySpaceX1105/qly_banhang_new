package com.example.qly_kho.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.qly_kho.dto.request.user.UserCreateRequest;
import com.example.qly_kho.dto.request.user.UserSearchRequest;
import com.example.qly_kho.dto.response.PageResponse;
import com.example.qly_kho.dto.response.user.UserResponse;
import com.example.qly_kho.service.application.UserApplicationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    
    private final UserApplicationService userApplicationService;


    @PreAuthorize("hasAuthority('USER_VIEW')")
    @GetMapping("/list")
    public PageResponse<UserResponse> getUserList(@Valid @ModelAttribute UserSearchRequest request) {

        return userApplicationService.getUserList(request);
    }


    @PreAuthorize("hasAuthority('USER_CREATE')")
    @PostMapping("/add")
    public void createUser(@Valid @RequestBody UserCreateRequest request) {

        userApplicationService.createUser(request);
    }
}
