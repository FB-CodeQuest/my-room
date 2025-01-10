// 이메일 유효성 검사
export const validateEmail = (email, domain = null) => {
    if (!email) return "이메일을 입력해주세요.";

    if(domain !== null){
        if (!domain || domain === "선택하세요") return "도메인을 선택해주세요.";
        const email = `${email}@${domain}`;

    }
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(email)) return "올바른 이메일 형식이 아닙니다.";

        return "";
};

// 비밀번호 유효성 검사
export const validatePassword = (password) => {
    if (!password) return "비밀번호을 입력해주세요.";
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegex.test(password)) return "비밀번호는 영문, 숫자, 특수문자를 포함하여 8~25자여야 합니다";

    return "";
}

// 전화번호 유효성 검사
export const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "전화번호을 입력해주세요.";
    const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;
    if (!phoneRegex.test(phoneNumber)) return "올바른 휴대폰 번호를 입력해주세요. (예: 01012345678)";

    return "";
}

// 생년월일 유효성 검사
export const validateBirthDate = (birthDate) => {
    if (!birthDate) return { message: "생년월일을 입력해주세요.", formatted: "" };

    const birthDateRegex = /^\d{6}$/; // YYMMDD 형식
    if (!birthDateRegex.test(birthDate)) {
        return { message: "올바른 생년월일을 입력해주세요. (예: 940715)", formatted: "" };
    }

    // 생년월일 포맷 변환 (YYMMDD → YYYY-MM-DD)
    const formattedBirthDate = `${birthDate.startsWith("0") || birthDate.startsWith("1") ? "20" : "19"}${birthDate.slice(0, 2)}-${birthDate.slice(2, 4)}-${birthDate.slice(4, 6)}`;

    return {message: "", formatted: formattedBirthDate };
}

