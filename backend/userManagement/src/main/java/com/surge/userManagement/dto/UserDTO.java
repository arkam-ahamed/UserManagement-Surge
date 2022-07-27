package com.surge.userManagement.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDTO {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String dateOfBirth;
    private String mobileNo;
    private boolean status;
    private String accountType;

    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
