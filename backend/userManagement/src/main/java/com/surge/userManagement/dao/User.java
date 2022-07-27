package com.surge.userManagement.dao;


import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Data
@Document("user_collection")
public class User {
    @Id
    private ObjectId id;
    private String firstName;
    private String lastName;
    @Indexed
    private String email;
    private String password;
    private String dateOfBirth;
    private String mobileNo;
    private boolean status;
    private String accountType;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
}
