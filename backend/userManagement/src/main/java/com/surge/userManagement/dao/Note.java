package com.surge.userManagement.dao;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document("note_collection")
public class Note {
    @Id
    private ObjectId id;
    private String title;
    private String description;
}
