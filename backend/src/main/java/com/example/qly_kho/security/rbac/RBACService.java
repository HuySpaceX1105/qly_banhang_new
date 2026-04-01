package com.example.qly_kho.security.rbac;


import java.util.Set;

import org.springframework.stereotype.Service;

import com.example.qly_kho.entity.Permission;
import com.example.qly_kho.entity.Role;
import com.example.qly_kho.entity.User;
import com.example.qly_kho.service.PermissionService;
import com.example.qly_kho.service.RoleService;
import com.example.qly_kho.service.UserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RBACService {

    private final UserService userService;
    private final RoleService roleService;
    private final PermissionService permissionService;

    public void assignRoleToUser(Long userId, Long roleId) {
        User user = userService.findById(userId);
        Role role = roleService.findById(roleId);

        user.addRole(role);
        user.increasePermissionVersion();

        userService.saveUser(user);
    }

    public void removeRoleFromUser(Long userId, Long roleId) {
        User user = userService.findById(userId);
        Role role = roleService.findById(roleId);

        user.removeRole(role);
        user.increasePermissionVersion();

        userService.saveUser(user);
    }

    public void assignPermissionToRole(Long roleId, Long permissionId) {
        
        Role role = roleService.findById(roleId);
        Permission permission = permissionService.findById(permissionId);

        role.addPermission(permission);
        roleService.saveRole(role);

        incrementUserPermissionVersion(roleId);
    }

    public void removePermissionFromRole(Long roleId, Long permissionId) {
        
        Role role = roleService.findById(roleId);
        Permission permission = permissionService.findById(permissionId);

        role.removePermission(permission);
        roleService.saveRole(role);

        incrementUserPermissionVersion(roleId);
    }

    private void incrementUserPermissionVersion(Long roleId) {
        Set<Long> userIds = userService.findUserIdByRoleId(roleId);
        userService.incrementPermissionVersionByUserIds(userIds);
    }
}
