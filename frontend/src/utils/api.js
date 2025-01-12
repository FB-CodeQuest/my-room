import axiosInstance from "./axiosInstance";

// 회원가입 API 호출 함수
export const signup = async (userData) => {
    try{
        const response = await axiosInstance.post("/users/signup", userData);
        if (response.status === 201) {
            throw { statusCode: response.status, message: "회원가입 실패: 서버 응답 오류" };
        }
        return response;
    }catch (error) {
        if (error.response) {
            // 상태 코드와 메시지를 함께 포함하여 에러 던짐
            const statusCode = error.response.status;
            const message = error.response.data.message || "회원가입 요청 중 오류가 발생했습니다.";
            throw { statusCode, message };
        }
        // 네트워크 오류 또는 기타 에러
        throw { statusCode: 0, message: "서버와의 통신 중 문제가 발생했습니다." };
    }
}

// 로그인 API 호출 함수
export const login = async ({email, password}) => {
    try{
        const response = await axiosInstance.post("/users/login",{email, password});
        console.log("API 응답 데이터:", response.data);
        if(response.status === 200){
            return response.data;
        }
    }catch (error) {
        if (error.response){
            throw{
                statusCode : error.response.status,
                message : error.response.data.message || "로그인 요청 중 오류가 발생했습니다."
            };
        }
        throw{
            statusCodd : 0,
            message : "서버와의 통신 중 문제가 발생했습니다."
        };
    }
}

// 인증 이메일 발송 API 호출 함수

export const emailSend = async (email) => {
    console.log("API로 전달된 email:", email);
    try{
        const response = await axiosInstance.post("/email/send", {email});
        console.log("서버 응답:", response);
        if(response.status === 200) return response.data;
    }catch (error) {
        console.error("API 요청 실패:", error);
        if(error.response){
            const statusCode = error.response.status;
            const message = error.response.data.message || "이메일 발송중 오류가 발생했습니다."
            throw {statusCode, message};
        };
        throw { statusCode: 0, message: "서버와의 통신 중 문제가 발생했습니다." };
    }
}

// 인증 코드 확인 API 호출 함수
export const emailVerify = async ({email, code}) => {
    console.log("API로 전달된 email,code:", email, code);
    try{
        const response = await axiosInstance.post("/email/verify", {
            email,
            code
        });
        console.log("서버 응답:", response);
        if(response.status === 200) return response.data;
    }catch (error) {
        console.error("API 요청 실패:", error);
        if(error.response){
            const statusCode = error.response.status
            const message = error.response.data.message || "인증 코드 확인 중 오류가 발생했습니다."
            throw {statusCode, message};
        };
        throw { statusCode: 0, message: "서버와의 통신 중 문제가 발생했습니다." };
    }
}

// 비밀번호 재설정 API 호출 함수
export const passwordReset = async ({email, password}) => {
    console.log("API로 전달된 email, password:", email, password);
    try{
        const response = await axiosInstance.put("/users/reset-password", {
            email,
            password
        });
        console.log("서버 응답:", response);
        if(response.status === 200) return response.data;
    }catch (error) {
        console.error("API 요청 실패:", error);
        if(error.response){
            const statusCode = error.response.status
            const message = error.response.data.message || "비밀번호 재설정 중 오류가 발생했습니다."
            throw {statusCode, message};
        };
        throw { statusCode: 0, message: "서버와의 통신 중 문제가 발생했습니다." };
    }
}