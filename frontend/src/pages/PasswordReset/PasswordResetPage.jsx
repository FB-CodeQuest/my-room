import "./PasswordResetPage.scss";
import Input from "../../components/Input/Input";
import {useState} from "react";
import Button from "../../components/Button/Button";

const PasswordResetPage = () => {
    const [emailAddress, setEmailAddress] = useState('');
    return(
        <div className={"password-reset-container"}>
            {/* 1단계 : 이메일 인증 */}
            <div className={"password-reset-email"}>
                <p className={"message"}>가입한 이메일 주소를 입력해주세요</p>
                <div className={"input-button-wrap"}>
                    <Input
                        className={"email-address"}
                        type={"text"}
                        id={"emailAddress"}
                        label={"이메일주소"}
                        placeholder={"이메일"}
                        onChange={(e) => setEmailAddress(e.target.value)}
                    />
                    <Button type={"submit"} className={"input-btn"}>확인</Button>
                </div>
                <Button type={"submit"} className={"input-btn"}>이메일로 인증코드 받기</Button>
            </div>

            {/* 2단계 : 이메일 인증 코드 입력 */}
            <div className={"password-reset-code"}>

            </div>
            {/* 3단계 : 비밀번호 재설정 */}
            <div className={"password-reset"}></div>
        </div>
    );
};

export default PasswordResetPage;