package com.fbcq.be.domain;

import com.fbcq.be.dto.request.SignUpRequest;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.sql.Date;
import java.time.LocalDateTime;

@Builder
@Getter
public class User {
    private Long userId;
    private String email;
    private String password;
    private String name;
    private String phone;
    private Date birthDate;
    private Gender gender;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

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

    // DTO -> User 변환 메서드
    public static User fromSignUpRequest(SignUpRequest request, String hashedPassword) {
        return User.builder()
                .email(request.email())
                .password(hashedPassword)
                .name(request.name())
                .phone(request.phone())
                .birthDate(request.birthDate())
                .gender(Gender.fromDbValue(request.gender()))
                .createdAt(LocalDateTime.now())
                .build();
    }
}
