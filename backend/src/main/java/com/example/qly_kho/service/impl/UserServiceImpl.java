package com.example.qly_kho.service.impl;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.core.NestedExceptionUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.example.qly_kho.entity.Role;
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
    private final RoleService roleService;

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
    public User createUser(User user) {
        try {
            User savedUser = userRepository.save(user);
            //gán role nhân viên cho user
            Role role = roleService.findById(3L);
            savedUser.addRole(role);

            return userRepository.save(savedUser);

        } catch (DataIntegrityViolationException ex) {
             String message = "Duplicate data";

            Throwable rootCause = NestedExceptionUtils.getMostSpecificCause(ex);

            if (rootCause instanceof ConstraintViolationException cve) {
                String constraint = cve.getConstraintName();

                if ("uk_users_username".equals(constraint)) {
                    message = "Username already exists";
                } else if ("uk_users_email".equals(constraint)) {
                    message = "Email already exists";
                }
            }

            throw new DuplicateException(message);
        }
    }

    @Override
    public void assignRoleToUser(Long userId, Long roleId) {
        User user = findById(userId);
        Role role = roleService.findById(roleId);

        user.addRole(role);

        userRepository.save(user);
    }

    @Override
    public void removeRoleFromUser(Long userId, Long roleId) {
        User user = findById(userId);
        Role role = roleService.findById(roleId);

        user.removeRole(role);

        userRepository.save(user);
    }
}
