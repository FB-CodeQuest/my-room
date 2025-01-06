import "./SignUp.scss";

import Form from "../../components/Form";
import Input from "../../components/Input/Input";
import {useState} from "react";
import DropDown from "../../components/DropDown";
import Button from "../../components/Button/Button";

const SignUp = () =>{
    const [email, setEmail] = useState('');
    const [domain, setDomain] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const handleDomainChange= (selectedValue) => {
        setDomain(selectedValue);
    };

    const addressOptions =[
        {value: "naver.com", label: "naver.com"},
        {value: "gmail.com", label: "gmail.com"},
        {value: "daum.net", label: "daum.net"},
        {value: "kakao.com", label: "kakao.com"},
    ]
    return(
        <div className={"signup"}>
            <h2>회원가입</h2>
            <div className={"signup-container"}>
                <Form className={"signup-form"}>
                    <div className={"email-wrap"}>
                        <Input
                            type={"email"}
                            id={"email"}
                            label={"이메일"}
                            showLabel={true}
                            placeholder={"이메일 주소를 입력해주세요"}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <span>@</span>
                        <DropDown
                            id={"domain"}
                            options={addressOptions}
                            value={domain}
                            onChange={handleDomainChange}
                        />
                    </div>
                    <Button type={"submit"} className={"submit-btn"}>회원가입</Button>
                    <Input
                        type={"password"}
                        id={"password"}
                        label={"비밀번호"}
                        showLabel={true}
                        placeholder={"비밀번호를 입력해주세요"}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <Input
                        type={"password"}
                        id={"password"}
                        label={"비밀번호 확인"}
                        showLabel={true}
                        placeholder={"비밀번호를 확인해주세요"}
                        onChange={(e)=>setPasswordCheck(e.target.value)}
                    />
                    <Input
                        type={"text"}
                        id={"name"}
                        label={"이름"}
                        showLabel={true}
                        placeholder={"이름을 입력해주세요"}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    <Input
                        type={"text"}
                        id={"phoneNumber"}
                        label={"전화번호"}
                        showLabel={true}
                        placeholder={"전화번호를 입력해주세요"}
                        onChange={(e)=>setPhoneNumber(e.target.value)}
                    />
                    <Input
                        type={"text"}
                        id={"birthDate"}
                        label={"생년월일"}
                        showLabel={true}
                        placeholder={"생년월일을 입력해주세요"}
                        maxLength={6}
                        onChange={(e)=>setBirthDate(e.target.value)}
                    />
                </Form>
            </div>
        </div>
    );
};

export default SignUp;