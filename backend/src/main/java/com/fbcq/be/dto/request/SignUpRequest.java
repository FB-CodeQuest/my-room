package com.fbcq.be.dto.request;

import com.fbcq.be.domain.User;

import java.sql.Date;

public record SignUpRequest (
        String email,
        String password,
        String name,
        String phone,
        Date birthDate,
        String gender
){
    public SignUpRequest(String email, String password, String name, String phone, Date birthDate, User.Gender gender) {
        this(email, password, name, phone, birthDate, gender.getDbValue());
    }
}


