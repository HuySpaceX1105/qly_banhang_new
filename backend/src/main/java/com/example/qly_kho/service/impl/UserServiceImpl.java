package com.example.qly_kho.service.impl;

import java.util.Set;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.example.qly_kho.entity.User;
import com.example.qly_kho.exception.custom.DuplicateException;
import com.example.qly_kho.exception.custom.NotFoundException;
import com.example.qly_kho.repository.UserRepository;
import com.example.qly_kho.service.UserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User findByUsername(String username) {

        return userRepository.findByUsername(username)
            .orElseThrow(() -> new NotFoundException(
                String.format("User with username: %s not found in UserService", username)
            ));
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new NotFoundException(
                String.format("User with (id: %s) not found in UserService", id)
            ));
    }

    @Override
    public User saveUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new DuplicateException("Username already exists in UserService");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new DuplicateException("Email already exists in UserService");
        }

        try {
            return userRepository.save(user);

        } catch (DataIntegrityViolationException ex) {
            throw new DuplicateException("Duplicate data in UserService: " + ex.getMessage());
        }
    }
    

    @Override
    public User updateUser(User user) {

        return userRepository.save(user);
    }

    @Override
    public Set<Long> findUserIdByRoleId(Long roleId) {
       return userRepository.findUserIdByRoleId(roleId);
    }

    @Override
    public void incrementPermissionVersionByUserIds(Set<Long> userIds) {
        userRepository.incrementPermissionVersionByUserIds(userIds);
    }
    
}
