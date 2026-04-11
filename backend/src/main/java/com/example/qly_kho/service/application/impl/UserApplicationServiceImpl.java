package com.example.qly_kho.service.application.impl;

import java.util.List;
import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.qly_kho.constant.ActionConstants;
import com.example.qly_kho.dto.request.user.UserCreateRequest;
import com.example.qly_kho.dto.request.user.UserSearchRequest;
import com.example.qly_kho.dto.response.PageResponse;
import com.example.qly_kho.dto.response.user.UserResponse;
import com.example.qly_kho.entity.Role;
import com.example.qly_kho.entity.User;
import com.example.qly_kho.mapper.UserMapper;
import com.example.qly_kho.security.cache.UserCache;
import com.example.qly_kho.service.application.UserApplicationService;
import com.example.qly_kho.service.domain.ActivityLogService;
import com.example.qly_kho.service.domain.EmailService;
import com.example.qly_kho.service.domain.RoleService;
import com.example.qly_kho.service.domain.UserService;
import com.example.qly_kho.util.CodeGenerator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserApplicationServiceImpl implements UserApplicationService {

    private final UserService userService;
    private final RoleService roleService;
    private final EmailService emailService;
    private final ActivityLogService activityLogService;
    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;


    @Override
    public PageResponse<UserResponse> getUserList(UserSearchRequest request) {

        int page = request.page();
        int size = request.size();
        String keyword = request.keyword();

        PageRequest pageRequest = PageRequest.of(page, size);

        Page<User> userPage = userService.searchUser(keyword, pageRequest);


        List<UserResponse> data = userPage.getContent()
                                    .stream()
                                    .map(u -> userMapper.toUserResponse(u))
                                    .toList();

        return new PageResponse<>(
            data,
            userPage.getNumber(),
            userPage.getSize(),
            userPage.getTotalElements(),
            userPage.getTotalPages()
        );
    }

    @Override
    public void createUser(UserCreateRequest request) {
        String code = CodeGenerator.generateUserCode();

        User newUser = User.createUser(
            request.username(),
            passwordEncoder.encode(code),
            request.email(),
            request.fullName()
        );
        
        List<Role> roles = roleService.findByIds(request.roleIds());

        roles.forEach(role -> newUser.addRole(role));

        if(Objects.equals(1, request.status())) newUser.enable();
        else newUser.disable();

        userService.saveUser(newUser);

        emailService.sendUserCreatedEmail(request.email(), request.username(), code);

        UserCache user = (UserCache) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        activityLogService.logActivity(
            user.getId(), 
            ActionConstants.CREATE, 
            ActionConstants.ENTITY_USER, 
            newUser.getId(), 
            "User created successfully", 
            "127.0.0.1"
        );
    }
}
