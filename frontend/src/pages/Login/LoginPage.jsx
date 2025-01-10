import "./LoginPage.scss";

import Form from "../../components/Form";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import CheckBox from "../../components/CheckBox/CheckBox";
import LinkButton from "../../components/LinkButton";
import ToggleButton from "../../components/ToggleButton/ToggleButton";

import {useState} from "react";
import {login} from "../../utils/api";
import {validateEmail, validatePassword} from "../../utils/validation";
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [order, setOrder] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const handleValidation = () => {
        let isValid = true;

        const emailError = validateEmail(email);

        if (emailError) {
            setEmailError(emailError);
            isValid = false;
        } else {
            setEmailError("");
        }

        const passwordError = validatePassword(password)
        if (passwordError) {
            setPasswordError(passwordError)
            isValid = false;
        } else {
            setPasswordError("");
        }
        return isValid;
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!handleValidation()) return;
        setIsLoading(true);
        try {
            const data = await login(email,password);
            alert("환영합니다");
            window.location.href = "/";
        } catch (error) {
            console.error("로그인 에러:", error , error.statusCode); // 에러 로그 확인
            alert(error.message || "로그인 요청중 문제가 발생했습니다.")

        } finally {
            setIsLoading(false);
        }
    }
    const handleChange = (e) => {
        setIsChecked((prev) => !prev);
    };


    return (
        <div className={"login"}>
            <h2>Login</h2>
            <div className={"login-container"}>
                <Form className={"login-form"} onSubmit={handleLogin}>
                    <div className={"input-wrap"}>
                        <Input
                            type={"email"}
                            id={"email"}
                            label={"이메일"}
                            placeholder={"이메일 주소를 입력해주세요"}
                            onChange={(e) => setEmail(e.target.value)}
                            className={emailError ? "error" : ""}
                            required
                        />
                        {emailError && <p className="error-message">{emailError}</p>}
                        <Input
                            type={"password"}
                            id={"password"}
                            label={"비밀번호"}
                            placeholder={"비밀번호를 입력해주세요"}
                            onChange={(e) => setPassword(e.target.value)}
                            className={passwordError ? "error" : ""}
                            required
                        />
                        {passwordError && <p className="error-message">{passwordError}</p>}
                    </div>
                    <CheckBox id={"remember"}
                              label={"로그인 유지하기"}
                              checked={isChecked}
                              onChange={handleChange}
                              />
                    <Button type={"submit"} className={"login-btn"}>
                        {isLoading ? "로그인 중..." : "로그인"}
                    </Button>
                </Form>
                <LinkButton to={"#"} className={"password-reset"}>비밀번호 재설정</LinkButton>
                <div className={"sns-login"}>
                    <LinkButton to={"#"} className={"sns-icon kakao"}><span className={"visually-hidden"}>Kakao</span></LinkButton>
                    <LinkButton to={"#"} className={"sns-icon google"}><span className={"visually-hidden"}>Google</span></LinkButton>
                    <LinkButton to={"#"} className={"sns-icon naver"}><span className={"visually-hidden"}>Naver</span></LinkButton>
                </div>
            </div>

            <div className={"order-container"}>
                <LinkButton to={"#"} className={"join"}>회원가입</LinkButton>
                <ToggleButton label={"비회원 주문 조회하기"}>
                    <Form className={"order-form"}>
                        <Input
                            type={"text"}
                            id={"order"}
                            placeholder={"주문자명"}
                            onChange={(e) => setOrder(e.target.value)}
                        />
                        <Input
                            type={"text"}
                            id={"order"}
                            placeholder={"주문번호"}
                            onChange={(e) => setOrderNumber(e.target.value)}
                        />
                        <Button type={"submit"} className={"order-btn"}>주문조회하기</Button>
                    </Form>
                </ToggleButton>
            </div>
        </div>
    );
};

export default LoginPage;