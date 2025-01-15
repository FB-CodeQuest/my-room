import Form from "../../components/Form";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {useState} from "react";
import {validatePassword} from "../../utils/validation";

const Step3PasswordReset = ({
    password,
    passwordError,
    passwordCheck,
    passwordCheckError,
    setPassword,
    setPasswordCheck,
    handleResetPassword,
    handleResetPasswordValidation,
}) => {
    return (
            <div className={"password-reset"}>
                <h2>Logo</h2>
                <Form className={"password-reset-form password-reset-wrap"} onSubmit={handleResetPassword}>
                    <Input
                        className={passwordError ? "error" : ""}
                        type={"password"}
                        id={"newPassword"}
                        label={"새 비밀번호"}
                        placeholder={"새 비밀번호"}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            handleResetPasswordValidation(e.target.value, passwordCheck);
                        }}
                    />
                    <Input
                        className={passwordCheckError ? "error" : ""}
                        type={"password"}
                        id={"newPasswordCheck"}
                        label={"새 비밀번호 확인"}
                        placeholder={"새 비밀번호 확인"}
                        onChange={(e) => {
                            setPasswordCheck(e.target.value);
                            handleResetPasswordValidation();
                        }}
                    />
                    {(passwordError || passwordCheckError) && (
                        <p className={"error-message"}>
                            {passwordError || passwordCheckError}
                        </p>
                    )}
                    <Button type={"submit"} className={"input-btn"}>
                        비밀번호 변경하기
                    </Button>
                </Form>
            </div>
        );
};

export default Step3PasswordReset;