package com.fbcq.be.service;

import com.fbcq.be.domain.User;
import com.fbcq.be.mapper.UserMapper;
import com.fbcq.be.dto.request.LoginRequest;
import com.fbcq.be.dto.request.SignUpRequest;
import com.fbcq.be.dto.response.LoginResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserMapper userDao;
    private final PasswordEncoder passwordEncoder;

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        // 이메일로 사용자 정보 조회
        User user = userDao.selectUserByEmail(loginRequest.email());
        if (user == null || !passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
            log.warn("Invalid login attempt for email: {}", loginRequest.email());
            return null; // 인증 실패
        }

        // 성공 시 LoginResponse 생성
        return userDao.selectLoginResponseByEmail(loginRequest.email());
    }



    @Override
    public int signUp(SignUpRequest signUpRequest) {
        // 비밀번호 해싱
        String hashedPassword = passwordEncoder.encode(signUpRequest.password());

        // User 객체 생성 (DTO -> 엔터티 변환)
        User user = User.fromSignUpRequest(signUpRequest, hashedPassword);

        // 데이터베이스 저장
        return userDao.insertUser(user);
    }


    @Override
    public boolean updatePasswordByEmail(String email, String password) {
        String hashedPassword = passwordEncoder.encode(password);
        return userDao.updatePasswordByEmail(email, hashedPassword);
    }
    @Override
    public boolean checkEmailExists(String email) {
        User existUser = userDao.selectUserByEmail(email);
        if (existUser != null) {
            return true;
        }
        return false;
    }
}
