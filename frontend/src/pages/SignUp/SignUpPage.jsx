import "./SignUpPage.scss";

import Form from "../../components/Form";
import Input from "../../components/Input/Input";
import {useRef, useState} from "react";
import DropDown from "../../components/DropDown/DropDown";
import Button from "../../components/Button/Button";
import RadioButton from "../../components/RadioButton/RadioButton";
import CheckBox from "../../components/CheckBox/CheckBox";

const SignUpPage = () =>{
    const [email, setEmail] = useState('');
    const [domain, setDomain] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [customDomain, setCustomDomain] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState({
        terms : false,
        privacy : false,
        marketing : false,
        sms : false,
        email : false
    });

    const inputRef = useRef(null);

    const handleDomainChange = (selectedValue) => {
        if (selectedValue === 'custom') {
            setDomain('custom');
            setTimeout(() => {
                inputRef.current?.focus(); // "직접 입력" 필드로 포커스 이동
            }, 0);
        } else {
            setDomain(selectedValue);
        }
    };

    const handleCustomDomainChange = (e) => {
        setCustomDomain(e.target.value); // "직접 입력" 값 업데이트
    };

    const handleCustomDomainSubmit = (e) => {
        e.preventDefault();
        if (customDomain.trim() !== '') {
            setDomain(customDomain);
        }
    };

    const handleRadioOptionChange = (value) => {
        console.log("선택된 옵션:", value);
        setSelectedOption(value);
    }

    const handleAllChange = () =>{
        const newChecked = !allChecked;
        setAllChecked(newChecked);
        setCheckedItems({
            terms: newChecked,
            privacy: newChecked,
            marketing: newChecked,
            sms: newChecked,
            email: newChecked,
        })
    }

    const handleItemChange = (key) => {
        setCheckedItems((prev) => {
            const newCheckedItems = {...prev, [key] : !prev[key]};
            setAllChecked(Object.values(newCheckedItems).every((val) => val));
            return newCheckedItems;
        });
    };

    const addressOptions =[
        {value: "naver.com", label: "naver.com"},
        {value: "gmail.com", label: "gmail.com"},
        {value: "daum.net", label: "daum.net"},
        {value: "kakao.com", label: "kakao.com"},
        {value: 'custom', label: '직접입력'}
    ]

    const genderOptions =[
            {value: "male", label: "남자"},
            {value: "female", label: "여자"},
    ]

    return(
        <div className={"signup"}>
            <h2>회원가입</h2>
            <div className={"signup-container"}>
                <Form className={"signup-form"}>
                    <div className={"input-group"}>
                        <div className={"email-wrap"}>
                            <Input
                                type={"email"}
                                className={"column"}
                                id={"email"}
                                label={"이메일"}
                                showLabel={true}
                                placeholder={"이메일 주소를 입력해주세요"}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            <span>@</span>
                            {domain !== 'custom' ? (
                                <DropDown
                                    id={"domain"}
                                    options={addressOptions}
                                    value={domain}
                                    onChange={handleDomainChange}
                                />
                            ) : (
                                    <Input
                                        ref={inputRef}
                                        className={"column"}
                                        type={"text"}
                                        id={"customDomain"}
                                        label={"직접입력"}
                                        placeholder={"직접입력"}
                                        value={customDomain}
                                        onChange={handleCustomDomainChange}
                                        onKeyDown={(e) => e.key === "Enter" && handleCustomDomainSubmit(e)}
                                        />
                            )}
                        </div>
                        <Button type={"submit"} className={"submit-btn"}>이메일 인증</Button>
                        <Input
                            type={"password"}
                            className={"column"}
                            id={"password"}
                            label={"비밀번호"}
                            showLabel={true}
                            placeholder={"비밀번호를 입력해주세요"}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <Input
                            type={"password"}
                            className={"column"}
                            id={"password"}
                            label={"비밀번호 확인"}
                            showLabel={true}
                            placeholder={"비밀번호를 확인해주세요"}
                            onChange={(e)=>setPasswordCheck(e.target.value)}
                        />
                        <Input
                            type={"text"}
                            className={"column"}
                            id={"name"}
                            label={"이름"}
                            showLabel={true}
                            placeholder={"이름을 입력해주세요"}
                            onChange={(e)=>setName(e.target.value)}
                        />
                        <Input
                            type={"text"}
                            className={"column"}
                            id={"phoneNumber"}
                            label={"전화번호"}
                            showLabel={true}
                            placeholder={"전화번호를 입력해주세요"}
                            onChange={(e)=>setPhoneNumber(e.target.value)}
                        />
                        <Input
                            type={"text"}
                            className={"column"}
                            id={"birthDate"}
                            label={"생년월일"}
                            showLabel={true}
                            placeholder={"생년월일을 입력해주세요"}
                            maxLength={6}
                            onChange={(e)=>setBirthDate(e.target.value)}
                        />
                        <RadioButton
                            groupLabel={"성별"}
                            name={"gender"}
                            selected={selectedOption}
                            options={genderOptions}
                            onChange={handleRadioOptionChange}
                        />
                    </div>
                    <div className={"agreement-group"}>
                       <CheckBox
                            id={"all"}
                            label={"전체 동의"}
                            checked={allChecked}
                            onChange={handleAllChange}
                       />
                        <div className={"individual-group"}>
                            <CheckBox
                                id={"terms"}
                                label={"이용약관 동의(필수)"}
                                checked={checkedItems.terms}
                                onChange={()=>handleItemChange("terms")}
                            />
                            <CheckBox
                                id={"privacy"}
                                label={"개인정보 수집 및 이용에 동의(필수)"}
                                checked ={checkedItems.privacy}
                                onChange={() => handleItemChange("privacy")}
                            />
                            <CheckBox
                                id={"marketing"}
                                label={"쇼핑정보 및 혜택 수신동의(선택)"}
                                checked={checkedItems.marketing}
                                onChange={() => handleItemChange("marketing")}
                            />
                            <div className={"sub-options-group"}>
                                <CheckBox
                                    id={"sms"}
                                    label={"SMS"}
                                    checked={checkedItems.sms}
                                    onChange={() => handleItemChange("sms")}
                                />
                                <CheckBox
                                    id="email"
                                    label="이메일"
                                    checked={checkedItems.email}
                                    onChange={() => handleItemChange("email")}
                                />
                            </div>
                        </div>
                    </div>
                    <Button type={"submit"}>회원가입</Button>
                </Form>
            </div>
        </div>
    );
};

export default SignUpPage;