package com.fbcq.be.domain;

import java.sql.Date;
import java.time.LocalDateTime;

public class User {
    private Long userId;
    private String email;
    private String password;
    private String name;
    private String phone;
    private Date birthDate;
    public enum Gender {
        MALE("M"), FEMALE("F");

        private final String dbValue;

        Gender(String dbValue) {
            this.dbValue = dbValue;
        }

        public String getDbValue() {
            return dbValue;
        }

        public static Gender fromDbValue(String dbValue) {
            for (Gender gender : values()) {
                if (gender.dbValue.equals(dbValue)) {
                    return gender;
                }
            }
            throw new IllegalArgumentException("Unknown database value: " + dbValue);
        }
    }

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
