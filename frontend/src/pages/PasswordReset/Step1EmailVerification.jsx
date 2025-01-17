import Form from "../../components/Form";
import InputWithButton from "../../components/Input/InputWithButton";
import Button from "../../components/Button/Button";

const Step1EmailVerification = ({
    emailAddress,
    emailError,
    isCodeConfirmed,
    isEmailInvalid,
    isButtonDisabled,
    handleValidation,
    handleSendEmail,
    handleCheckEmail,
}) => {
    return (
        <Form className={"password-reset-form password-reset-email"} onSubmit={handleSendEmail}>
            <p className={"message"}>가입한 이메일 주소를 입력해주세요</p>
            <InputWithButton
                className={`${emailError ? "error" : ""} ${isCodeConfirmed ? "disabled" : ""}`}
                type={"email"}
                id={"emailAddress"}
                label={"이메일주소"}
                placeholder={"이메일"}
                onChange={handleValidation}
                disabled={isCodeConfirmed}
                children={isCodeConfirmed ? "확인 완료" : "확인"}
                btnDisabled={isEmailInvalid || isCodeConfirmed}
                btnClassName={`input-btn ${isCodeConfirmed ||isEmailInvalid || isButtonDisabled ? "disabled-btn" : ""}`}
                timer={null}
                onClick={handleCheckEmail}
            />
            {emailError && <p className={"error-message"}>{emailError}</p>}
            <Button
                type={"submit"}
                className={`${isCodeConfirmed ? "email-btn" : "email-btn disable-btn"}`}
                disabled={!isCodeConfirmed}
            >
                이메일로 인증코드 받기
            </Button>
        </Form>
    );
};

export default Step1EmailVerification