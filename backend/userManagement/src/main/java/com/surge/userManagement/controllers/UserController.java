package com.surge.userManagement.controllers;

import com.surge.userManagement.dto.UserDTO;
import com.surge.userManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping()
    public UserDTO addUser(@RequestBody UserDTO userDTO) {
        return userService.addUser(userDTO);
    }
    @GetMapping()
    public List<UserDTO> getAllUsers(@RequestParam(defaultValue = "0") Integer offset,
                                    @RequestParam(defaultValue = "20") Integer limit) {
        return userService.getAllUsers(offset,limit);
    }

    @GetMapping("{id}")
    public UserDTO getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @PutMapping
    public UserDTO updateUser(@RequestBody UserDTO userDTO) {
        return userService.updateUser(userDTO);
    }

    @DeleteMapping("{id}")
    public void deleteUserById(@PathVariable String id) {
        userService.deleteUser(id);
    }
}
