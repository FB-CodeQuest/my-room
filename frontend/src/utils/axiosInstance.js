import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api", // 공통된 API URL 설정
    headers: {
        "Content-Type": "application/json", // 요청 헤더
    },
    withCredentials : true // 쿠키포함하여 요청
});

export default axiosInstance;