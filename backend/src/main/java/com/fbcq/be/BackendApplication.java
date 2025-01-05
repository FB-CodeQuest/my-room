package com.fbcq.be;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        // .env 파일 경로 명시적으로 설정
        Dotenv dotenv = Dotenv.configure()
                .filename(".env") // 파일명을 명시적으로 설정
                .load();

        // 환경 변수 테스트 출력 (필요시 삭제 가능)
        System.out.println("DB URL: " + dotenv.get("MYSQL_DB_URL"));

        SpringApplication.run(BackendApplication.class, args);
    }

}
