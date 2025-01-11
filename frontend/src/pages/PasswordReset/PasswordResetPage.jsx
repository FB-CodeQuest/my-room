import "./PasswordResetPage.scss";

import Input from "../../components/Input/Input";
import InputWithButton from "../../components/Input/InputWithButton";
import Button from "../../components/Button/Button";
import LinkButton from "../../components/LinkButton";
import Form from "../../components/Form";

import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {emailSend, emailVerify} from "../../utils/api";
import {validateEmail, validateVerificationCode} from "../../utils/validation";

const PasswordResetPage = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [time, setTime] = useState(180);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [newPassword, setNewPassword] = useState(false);
    const [newPasswordCheck, setNewPasswordCheck] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationCodeError, setVerificationCodeError] = useState('');
    const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const initialStep = parseInt(searchParams.get("step")) || 1;
    const [step, setStep] = useState(initialStep);

    const nextStep = () => setStep((prev) => prev + 1);

    useEffect(() => {
        setSearchParams({ step });
    }, [step, setSearchParams]);

    const handleConfirmClick = () => {
        setTime(180);
        setIsTimerActive(true);
    };

    // 타이머
    useEffect(()=>{
        if(isTimerActive && time > 0){
            const timer = setTimeout(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }else if(isTimerActive && time === 0) {
            setIsTimerActive(false);
            setVerificationCodeError("인증 시간이 만료되었습니다. 다시 요청해주세요.");
        }
    },[time, isTimerActive]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };
    // 이메일 유효성 검사 및 버튼 활성화 상태 업데이트
    const handleValidation = (e) => {
        const value = e.target.value;
        setEmailAddress(value);

        if (validateEmail(value)) {
            setEmailError(validateEmail(value));
            setIsButtonDisabled(true);
        } else {
            setEmailError("");
            setIsButtonDisabled(false);
        }
    };

    // 인증 코드 유효성 검사 및 버튼 활성화 상태 업데이트
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

    // 이메일 인증 API 요청
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
            nextStep();
        } catch (error) {
            console.error("Error:", error);
            console.log(error.statusCode);
            alert(error.message || "이메일 발송 중 문제가 발생했습니다.");
        }
    };

    // 인증 코드 인증 API 요청
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

    return(
        <div className={"password-reset-container"}>
            {/* 1단계 : 이메일 인증 */}
            {step === 1 &&(
                <Form className={"password-reset-form password-reset-email"} onSubmit={handleSendEmail}>
                    <p className={"message"}>가입한 이메일 주소를 입력해주세요</p>
                    <InputWithButton
                        className={emailError? "input-with-button error" : "input-with-button"}
                        type={"email"}
                        id={"emailAddress"}
                        label={"이메일주소"}
                        placeholder={"이메일"}
                        onChange={handleValidation}
                        children={"확인"}
                        btnDisabled={isButtonDisabled}
                        btnClassName={`input-btn ${isButtonDisabled ? "disable-btn" : ""}`}
                        timer={null}
                    />
                    {emailError && <p className={"error-message"}>{emailError}</p>}
                    <Button type={"submit"} className={"email-btn"}> 이메일로 인증코드 받기</Button>
                </Form>
            )}

            {/* 2단계 : 이메일 인증 코드 입력 */}
            {step === 2 &&(
                <Form className={"password-reset-form password-reset-code"}>
                    <p className={"message"}>이메일로 받은 인증코드를 입력해주세요.</p>
                    <InputWithButton
                        className={verificationCodeError ? "input-with-button error" : "input-with-button"}
                        type={"text"}
                        id={"passwordResetCode"}
                        label={"인증코드 6자리"}
                        placeholder={"인증코드 6자리"}
                        maxLength={6}
                        onChange={handleVerificationCodeChange}
                        children={isCodeConfirmed ? "확인 완료" : "확인"}
                        btnDisabled={isCodeConfirmed || isButtonDisabled}
                        btnClassName={`input-btn ${isCodeConfirmed || isButtonDisabled? "disable-btn" : ""}`}
                        timer={isTimerActive ? formatTime(time) : "00:00"}
                        onclick={handleSendCode}
                    />
                    {verificationCodeError && <p className={"error-message"}>{verificationCodeError}</p>}
                    <div className={"message-wrap"}>
                        <p className={"message"}>이메일 받지 못하셨나요?</p>
                        <LinkButton to={"#"} className={"link-btn"}>이메일 재전송하기</LinkButton>
                    </div>
                    <Button className={"input-btn"} onClick={nextStep}>비밀번호 재설정하기</Button>
                </Form>
            )}

            {/* 3단계 : 비밀번호 재설정 */}
            {step === 3 &&(
                <div className={"password-reset"}>
                <h2>Logo</h2>
                <Form className={"password-reset-form password-reset-wrap"}>
                    <Input
                        type={"password"}
                        id={"newPassword"}
                        label={"새 비밀번호"}
                        placeholder={"새 비밀번호"}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input
                        type={"password"}
                        id={"newPasswordCheck"}
                        label={"새 비밀번호 확인"}
                        placeholder={"새 비밀번호 확인"}
                        onChange={(e) => setNewPasswordCheck(e.target.value)}
                    />
                    <Button type={"submit"} className={"input-btn"}>비밀번호 변경하기</Button>
                </Form>
            </div>
            )}
        </div>
    );
};

export default PasswordResetPage;