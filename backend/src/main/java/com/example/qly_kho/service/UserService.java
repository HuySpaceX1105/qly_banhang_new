package com.example.qly_kho.service;

import com.example.qly_kho.entity.User;

public interface UserService {
    User findByUsername(String username);

    User findById(Long id);

    User createUser(User user);

    void assignRoleToUser(Long userId, Long roleId);

    void removeRoleFromUser(Long userId, Long roleId);
}
