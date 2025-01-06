package com.fbcq.be;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mail.MailSenderAutoConfiguration;

@SpringBootApplication
//@SpringBootApplication(exclude = {MailSenderAutoConfiguration.class})
public class BackendApplication {

    public static void main(String[] args) {
        // .env 파일 경로 명시적으로 설정
        Dotenv dotenv = Dotenv.configure()
                .filename(".env") // 파일명을 명시적으로 설정
                .load();

        // Dotenv 값을 Spring System Properties로 설정
        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

        // 환경 변수 테스트 출력 (필요시 삭제 가능)
//        System.out.println("DB URL: " + dotenv.get("MYSQL_DB_URL"));
//        System.out.println("DB USER: " + dotenv.get("MYSQL_DB_USER"));
//        System.out.println("DB PASSWORD: " + dotenv.get("MYSQL_DB_PASSWORD"));
//        System.out.println("NAVER_SMTP_PORT " + dotenv.get("NAVER_SMTP_PORT"));
//        System.out.println("NAVER_SMTP_HOST " + dotenv.get("NAVER_SMTP_HOST"));
//        System.out.println("NAVER_SMTP_EMAIL " + dotenv.get("NAVER_SMTP_EMAIL"));
//        System.out.println("NAVER_SMTP_PASSWORD " + dotenv.get("NAVER_SMTP_PASSWORD"));
        SpringApplication.run(BackendApplication.class, args);
    }

}
