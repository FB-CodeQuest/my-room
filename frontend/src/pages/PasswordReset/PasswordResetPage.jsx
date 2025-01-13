import "./PasswordResetPage.scss";

import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {checkEmail, emailSend, emailVerify, passwordReset} from "../../utils/api";
import {validateEmail, validatePassword, validateVerificationCode} from "../../utils/validation";
import Step1EmailVerification from "./Step1EmailVerification";
import Step2CodeVerification from "./Step2CodeVerification";
import Step3PasswordReset from "./Step3PasswordReset";

const PasswordResetPage = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);

    const [verificationCode, setVerificationCode] = useState('');
    const [verificationCodeError, setVerificationCodeError] = useState('');
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [time, setTime] = useState(180);

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();
    const initialStep = parseInt(searchParams.get("step")) || 1;
    const [step, setStep] = useState(initialStep);

    const navigate = useNavigate()
    const nextStep = () => setStep((prev) => prev + 1);

    useEffect(() => {
        setSearchParams({ step });
    }, [step, setSearchParams]);

    // 타이머
    useEffect(()=>{
        if(isTimerActive && time > 0){
            const timer = setTimeout(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }else if(isTimerActive && time === 0) {
            setIsTimerActive(false);
            setIsButtonDisabled(false);
            setVerificationCodeError("인증 시간이 만료되었습니다. 다시 요청해주세요.");
        }
    },[time, isTimerActive]);

    useEffect(() => {
        handleResetPasswordValidation();
    }, [password, passwordCheck]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };
    // 이메일 유효성 검사 및 버튼 활성화 상태 업데이트 1
    const handleValidation = (e) => {
        const value = e.target.value;
        console.log("이메일 입력값:", value);
        setEmailAddress(value);

        if (validateEmail(value)) {
            setEmailError(validateEmail(value));
            setIsButtonDisabled(true);
            setIsEmailInvalid(true);
        } else {
            setEmailError("");
            setIsButtonDisabled(false);
            setIsEmailInvalid(false);
        }
    };

    // 인증 코드 유효성 검사 및 버튼 활성화 상태 업데이트 2
    const handleVerificationCodeChange = (e) => {
        const value = e.target.value;
        setVerificationCode(value);

        const error = validateVerificationCode(value);
        if(error) {
            setVerificationCodeError(error);
            setIsButtonDisabled(true);
        }else{
            setVerificationCodeError("");
            setIsButtonDisabled(false);
        }
    }

    // 이메일 인증 API 요청 1
    const handleSendEmail = async (e) => {
        e.preventDefault();
        // 유효성 검사 실패 시 중단
        const emailError = validateEmail(emailAddress);
        if (emailError) {
            setEmailError(emailError);
            return;
        }

        console.log("버튼이 클릭")
        try {
            const response = await emailSend(emailAddress);
            console.log("API 응답:", response);
            alert("인증 이메일이 발송되었습니다. 이메일을 확인해주세요.");
            setTime(180);
            setIsTimerActive(true);
            setIsCodeConfirmed(false);
            setEmailError("")
            setIsEmailInvalid(false);
            nextStep();
        } catch (error) {
            console.error("Error:", error);
            console.log(error.statusCode);
            alert(error.message || "이메일 발송 중 문제가 발생했습니다.");
        }
    };

    // 이메일 존재 확인 API요청 1
    const handleCheckEmail = async (e) => {
        e.preventDefault();

        if (isButtonDisabled) return;
        console.log("handleCheckEmail 호출됨");
        try{
            const response = await checkEmail(emailAddress);
            console.log("이메일 존재 확인 결과:", response);
            console.log("response.available", response.available)


            if (response.available) {
                // 유효하지않은 이메일일 경우
                setEmailError("등록된 이메일이 아닙니다.");
                setIsEmailInvalid(true);
            } else {
                // 유효한 이메일일 경우
                setIsCodeConfirmed(true);
                setIsEmailInvalid(false);
            }

        }catch (error){
            console.error("에러 발생:", error);
            alert(error.message || "문제가 발생했습니다.");
        }

    }

    // 인증 코드 인증 API 요청 2
    const handleSendCode = async (e) => {
        e.preventDefault();
        // 유효성 검사 실패 시 중단
        const verificationCodeError = validateVerificationCode(verificationCode);
        if (verificationCodeError) {
            setVerificationCodeError(verificationCodeError);
            return;
        }
        console.log("버튼이 클릭")
        console.log(emailAddress);
        try{
            const response = await emailVerify({
                email: emailAddress,
                code: verificationCode,
            });
            console.log("인증 성공:", response);
            alert("인증이 완료되었습니다.");
            setIsTimerActive(false);
            setIsCodeConfirmed(true);
        }catch (error) {
            console.error("Error:", error);
            setVerificationCodeError("인증 코드가 유효하지 않습니다.");
            console.log(error.statusCode);
            alert(error.message || "인증 중 문제가 발생했습니다.");
        }
    }

    // 이메일 재전송 API요청 2
    const handleResendEmail = async (e) => {
        e.preventDefault();
        // 유효성 검사 실패 시 중단
        const emailError = validateEmail(emailAddress);
        if (emailError) {
            setEmailError(emailError);
            return;
        }

        console.log("재전송 클릭")
        try {
            const response = await emailSend(emailAddress);
            console.log("API 응답:", response);
            alert("이메일이 재전송되었습니다. 받은 편지함을 확인해주세요.");
            setTime(180);
            setIsTimerActive(true);
            setIsCodeConfirmed(false);
        } catch (error) {
            console.error("Error:", error);
            console.log(error.statusCode);
            alert(error.message || "이메일 재전송 중 문제가 발생했습니다.");
        }finally {
            setIsButtonDisabled(false);
        }
    };

    // 비밀번호 재설정
    const handleResetPasswordValidation = () => {
        let isValid = true;

        // 비밀번호 유효성 검사
        if(password.trim() === '') {
            setPasswordError("");
        }else{
            const passwordError = validatePassword(password);
            if (passwordError) {
                setPasswordError(passwordError);
                isValid = false;
            } else {
                setPasswordError("");
            }
        }

        // 비밀번호 확인 검사
        if (passwordCheck.trim() === "") {
            setPasswordCheckError("");
        }else if (passwordCheck !== password) {
            setPasswordCheckError("비밀번호가 일치하지 않습니다.");
            isValid = false;
        } else {
            setPasswordCheckError("");
        }

        return isValid;
    };


    // 비밀번호 재설정 API요청
    const handleResetPassword = async (e) => {
        e.preventDefault();
        const isValid = handleResetPasswordValidation();
        if (!isValid) return;

        try {
            const response = await passwordReset({
                email: emailAddress,
                password: password,
            });
            console.log("API 응답:", response);
            alert("비밀번호 변경 완료!");
            navigate("/");
        } catch (error) {
            console.error("Error:", error);
            console.log(error.statusCode);
            alert(error.message || "비밀번호 변경 중 문제가 발생했습니다.");
        }
    }

    return(
        <div className={"password-reset-container"}>
            {/* 1단계 : 이메일 인증 */}
            {step === 1 &&(
                <Step1EmailVerification
                    emailAddress={emailAddress}
                    emailError={emailError}
                    isCodeConfirmed={isCodeConfirmed}
                    isEmailInvalid={isEmailInvalid}
                    isButtonDisabled={isButtonDisabled}
                    handleValidation={handleValidation}
                    handleSendEmail={handleSendEmail}
                    handleCheckEmail={handleCheckEmail}
                />
            )}

            {/* 2단계 : 이메일 인증 코드 입력 */}
            {step === 2 &&(
                <Step2CodeVerification
                    verificationCode={verificationCode}
                    verificationCodeError={verificationCodeError}
                    isTimerActive={isTimerActive}
                    time={time}
                    isCodeConfirmed={isCodeConfirmed}
                    handleVerificationCodeChange={handleVerificationCodeChange}
                    handleSendCode={handleSendCode}
                    handleResendEmail={handleResendEmail}
                    formatTime={formatTime}
                    nextStep={nextStep}
                />
            )}

            {/* 3단계 : 비밀번호 재설정 */}
            {step === 3 &&(
                <Step3PasswordReset
                    password={password}
                    passwordError={passwordError}
                    passwordCheck={passwordCheck}
                    passwordCheckError={passwordCheckError}
                    setPassword={setPassword}
                    setPasswordCheck={setPasswordCheck}
                    handleResetPasswordValidation={handleResetPasswordValidation}
                    handleResetPassword={handleResetPassword}
                />
            )}
        </div>
    );
};

export default PasswordResetPage;