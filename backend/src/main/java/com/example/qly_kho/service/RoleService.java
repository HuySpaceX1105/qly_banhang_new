package com.example.qly_kho.service;

import com.example.qly_kho.entity.Role;

public interface RoleService {
    
    // tìm kiếm role theo id
    Role findById(Long id);

    //save role
    Role saveRole(Role role);
}
