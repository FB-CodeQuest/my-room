package com.fbcq.be.service;

import com.fbcq.be.mapper.UserMapper;
import com.fbcq.be.dto.request.LoginRequest;
import com.fbcq.be.dto.request.SignUpRequest;
import com.fbcq.be.dto.response.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserMapper userDao;

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        return userDao.select(loginRequest);
    }

    @Override
    public int signUp(SignUpRequest signUpRequest) {
        return userDao.create(signUpRequest);
    }
}
