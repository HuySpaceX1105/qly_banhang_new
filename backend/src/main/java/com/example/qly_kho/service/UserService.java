package com.example.qly_kho.service;

import java.util.Set;

import com.example.qly_kho.entity.User;

public interface UserService {

    //tìm kiếm user theo username
    User findByUsername(String username);

    //tìm kiếm user theo id
    User findById(Long id);

    //tạo user
    User saveUser(User user);

    //cập nhật user
    User updateUser(User user);

    //lấy user id theo vai trò 
    Set<Long> findUserIdByRoleId(Long roleId);

    //
    void incrementPermissionVersionByUserIds(Set<Long> userIds);
}
