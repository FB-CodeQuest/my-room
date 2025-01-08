package com.fbcq.be.jwt;

import java.io.File;
import java.io.FileInputStream;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

public class KeyLoader {

    // Private Key 로드
    public static PrivateKey loadPrivateKey(String filePath) throws Exception {
        byte[] keyBytes = readKeyFile(filePath);
        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePrivate(spec);
    }

    // Public Key 로드
    public static PublicKey loadPublicKey(String filePath) throws Exception {
        byte[] keyBytes = readKeyFile(filePath);
        X509EncodedKeySpec spec = new X509EncodedKeySpec(keyBytes);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePublic(spec);
    }

    // 키 파일 읽기
    private static byte[] readKeyFile(String filePath) throws Exception {
        File file = new File(filePath);
        try (FileInputStream fis = new FileInputStream(file)) {
            byte[] keyBytes = new byte[(int) file.length()];
            fis.read(keyBytes);
            return Base64.getDecoder().decode(keyBytes); // Base64 디코딩
        }
    }
}

