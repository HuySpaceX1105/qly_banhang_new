package com.example.qly_kho.service.application.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.qly_kho.dto.request.user.UserSearchRequest;
import com.example.qly_kho.dto.response.PageResponse;
import com.example.qly_kho.dto.response.user.UserResponse;
import com.example.qly_kho.entity.User;
import com.example.qly_kho.mapper.UserMapper;
import com.example.qly_kho.service.application.UserApplicationService;
import com.example.qly_kho.service.domain.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserApplicationServiceImpl implements UserApplicationService {


    private final UserService userService;
    private final UserMapper userMapper;

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
}
