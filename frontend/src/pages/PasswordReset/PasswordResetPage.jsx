import "./PasswordResetPage.scss";
import Input from "../../components/Input/Input";
import {useEffect, useState} from "react";
import Button from "../../components/Button/Button";
import LinkButton from "../../components/LinkButton";
import Form from "../../components/Form";

const PasswordResetPage = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [time, setTime] = useState(null);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [newPassword, setNewPassword] = useState(false);
    const [newPasswordCheck, setNewPasswordCheck] = useState(false);

    const handleConfirmClick = () => {
        setTime(180);
        setIsTimerActive(true);
    };

    useEffect(()=>{
        if(isTimerActive && time > 0){
            const timer = setTimeout(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }else if(isTimerActive && time === 0) {
            setIsTimerActive(false);
        }
    },[time, isTimerActive]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    return(
        <div className={"password-reset-container"}>
            {/* 1단계 : 이메일 인증 */}
            <Form className={"password-reset-form password-reset-email"}>
                <p className={"message"}>가입한 이메일 주소를 입력해주세요</p>
                <div className={"input-button-wrap"}>
                    <Input
                        className={"input-with-button"}
                        type={"text"}
                        id={"emailAddress"}
                        label={"이메일주소"}
                        placeholder={"이메일"}
                        onChange={(e) => setEmailAddress(e.target.value)}
                    />
                    <Button type={"submit"} className={"input-btn"}>확인</Button>
                </div>
                <Button type={"submit"} className={"input-btn"}>이메일로 인증코드 받기</Button>
            </Form>

            {/* 2단계 : 이메일 인증 코드 입력 */}
            <Form className={"password-reset-form password-reset-code"}>
                <p className={"message"}>가입한 이메일 주소를 입력해주세요</p>
                <div className={"input-button-wrap"}>
                    <Input
                        className={"input-with-button"}
                        type={"text"}
                        id={"passwordResetCode"}
                        label={"인증코드 6자리"}
                        placeholder={"인증코드 6자리"}
                        maxLength={6}
                        onChange={(e) => setEmailAddress(e.target.value)}
                    />
                    {isTimerActive && (
                        <p className={"timer"}>{formatTime(time)}</p>
                    )}
                    <Button type={"submit"} className={"input-btn"} onClick={handleConfirmClick}>확인</Button>
                </div>
                <div className={"message-wrap"}>
                    <p className={"message"}>이메일 받지 못하셨나요?</p>
                    <LinkButton to={"#"} className={"link-btn"}>이메일 재전송하기</LinkButton>
                </div>
                <Button type={"submit"} className={"input-btn"}>비밀번호 재설정하기</Button>
            </Form>
            {/* 3단계 : 비밀번호 재설정 */}
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
        </div>
    );
};

export default PasswordResetPage;