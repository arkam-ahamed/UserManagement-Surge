package com.surge.userManagement.enums;

public enum UserTypes {
    ADMIN("ADMIN"),
    STUDENT("STUDENT");

    private String userValue;

    UserTypes(String userValue) {
        this.userValue = userValue;
    }

    public String getUserValue() {
        return userValue;
    }
}
