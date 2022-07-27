package com.surge.userManagement.service;

import com.surge.userManagement.dto.UserDTO;

import java.util.List;

public interface UserService {
    UserDTO addUser(UserDTO userDTO);

    List<UserDTO> getAllUsers(Integer offset, Integer limit);

    UserDTO getUserById(String id);

    UserDTO updateUser(UserDTO userDTO);

    void deleteUser(String id);
}
