package com.fbcq.be.mapper;

import com.fbcq.be.domain.User;
import com.fbcq.be.dto.request.LoginRequest;
import com.fbcq.be.dto.response.LoginResponse;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insertUser(User user);
    boolean updatePasswordByEmail(String email, String password);
    // LoginResponse를 반환하는 메서드
    LoginResponse selectLoginResponseByEmail(String email);
    // User를 반환하는 메서드
    User selectUserByEmail(String email);
}
