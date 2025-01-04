package com.fbcq.be.mapper;

import com.fbcq.be.dto.request.LoginRequest;
import com.fbcq.be.dto.request.SignUpRequest;
import com.fbcq.be.dto.response.LoginResponse;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    LoginResponse select(LoginRequest loginRequest);
    int create(SignUpRequest signUpRequest);
}
