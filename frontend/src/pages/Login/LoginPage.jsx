import "./LoginPage.scss";

import Form from "../../components/Form";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import CheckBox from "../../components/CheckBox/CheckBox";
import LinkButton from "../../components/LinkButton";
import ToggleButton from "../../components/ToggleButton/ToggleButton";

import {useState} from "react";
import axiosInstance from "../../utils/axiosInstance";
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [order, setOrder] = useState('');
    const [orderNumber, setOrderNumber] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const response = await axiosInstance.post("/users/login",{
               email,
               password
            });

            if(response.status === 200){
                const {userId, name} = response.data;
                alert(`환영합니다,${name}님!`);
                window.location.href = "/";
            }
        } catch (error) {
            if(error.response && error.response.status === 401) {
                alert("이메일 또는 비밀번호가 일지하지 않습니다");
            } else {
                alert("로그인 요청 중 문제가 발생했습니다");
                console.log("로그인 문제발생")
            }

        }finally {
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
                            required
                        />
                        <Input
                            type={"password"}
                            id={"password"}
                            label={"비밀번호"}
                            placeholder={"비밀번호를 입력해주세요"}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <CheckBox id={"remember"}
                              label={"로그인 유지하기"}
                              checked={isChecked}
                              onChange={handleChange}
                              />
                    <Button type={"submit"}>
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
                    </Form>
                </ToggleButton>
            </div>
        </div>
    );
};

export default LoginPage;