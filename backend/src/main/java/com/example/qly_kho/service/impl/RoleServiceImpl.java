package com.example.qly_kho.service.impl;

import org.springframework.stereotype.Service;

import com.example.qly_kho.entity.Role;
import com.example.qly_kho.exception.custom.NotFoundException;
import com.example.qly_kho.repository.RoleRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class RoleServiceImpl implements RoleService {
    
    private final RoleRepository roleRepository;

    @Override
    public Role findById(Long id) {
        
        return roleRepository.findById(id)
            .orElseThrow(() -> new NotFoundException(
                String.format("Role with (id: %s) not found in RoleService", id)
            ));
    }

    
}
