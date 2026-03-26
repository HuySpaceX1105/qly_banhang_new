package com.example.qly_kho.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.qly_kho.dto.response.AuthUserResponse;
import com.example.qly_kho.entity.Role;
import com.example.qly_kho.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    
    @Mapping(source = "id", target = "userId")
    @Mapping(source = "roles", target = "roles")
    AuthUserResponse toAuthUserResponse(User user);

    default String mapRoleToString(Role role) {
        return role.getName();
    }
}
