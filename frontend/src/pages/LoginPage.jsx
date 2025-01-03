import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";

import {useState} from "react";
import {Link} from "react-router-dom";
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className={"login"}>
            <h2>Login</h2>
            <Form>
                <Input
                    type={"email"}
                    id={"email"}
                    label={"이메일"}
                    placeholder={"이메일 주소를 입력해주세요"}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type={"password"}
                    id={"password"}
                    label={"비밀번호"}
                    placeholder={"비밀번호를 입력해주세요"}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <CheckBox id={"remember"}
                          label={"로그인 유지하기"}
                          checked={false}
                          />
                <Button type={"submit"}>로그인</Button>
            </Form>
            {/*<Link to="/passwordReset">비밀번호 재설정</Link>*/}
        </div>
    );
};

export default LoginPage;