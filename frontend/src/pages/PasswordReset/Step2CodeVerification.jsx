import InputWithButton from "../../components/Input/InputWithButton";
import Button from "../../components/Button/Button";
import Form from "../../components/Form";

const Step2CodeVerification = ({
   verificationCode,
   verificationCodeError,
   isTimerActive,
   time,
   isCodeConfirmed,
   isButtonDisabled,
   handleVerificationCodeChange,
   handleSendCode,
   handleResendEmail,
   formatTime,
   nextStep,
}) => {
    return (
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
                btnDisabled={isCodeConfirmed || isButtonDisabled || !isTimerActive}
                btnClassName={`input-btn ${isCodeConfirmed || isButtonDisabled || !isTimerActive ? "disable-btn" : ""}`}
                timer={isTimerActive ? formatTime(time) : "00:00"}
                onClick={handleSendCode}
            />
            {verificationCodeError && <p className={"error-message"}>{verificationCodeError}</p>}
            <div className={"message-wrap"}>
                <p className={"message"}>이메일 받지 못하셨나요?</p>
                <Button className={"text-btn"} onClick={handleResendEmail}>이메일 재전송하기</Button>
            </div>
            <Button
                className={`${isCodeConfirmed ? "" : "disable-btn"}`}
                onClick={nextStep}
                disabled={!isCodeConfirmed}
            >
                비밀번호 재설정하기
            </Button>
        </Form>
    )
}

export default Step2CodeVerification;
