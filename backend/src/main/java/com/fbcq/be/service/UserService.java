package com.fbcq.be.service;

import com.fbcq.be.dto.request.LoginRequest;
import com.fbcq.be.dto.request.SignUpRequest;
import com.fbcq.be.dto.response.LoginResponse;

public interface UserService {

    LoginResponse login(LoginRequest loginRequest);

    int signUp(SignUpRequest signUpRequest);
}