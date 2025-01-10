import axiosInstance from "./axiosInstance";

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