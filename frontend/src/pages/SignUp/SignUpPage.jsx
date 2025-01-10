import "./SignUpPage.scss";

import Form from "../../components/Form";
import Input from "../../components/Input/Input";
import DropDown from "../../components/DropDown/DropDown";
import Button from "../../components/Button/Button";
import RadioButton from "../../components/RadioButton/RadioButton";
import CheckBox from "../../components/CheckBox/CheckBox";
import axiosInstance from "../../utils/axiosInstance";

import {useRef, useState} from "react";
import InputWithButton from "../../components/Input/InputWithButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {validateBirthDate, validateEmail, validatePassword, validatePhoneNumber} from "../../utils/validation";

const SignUpPage = () => {
    // Input 상태
    const [email, setEmail] = useState('');
    const [domain, setDomain] = useState('');
    const [customDomain, setCustomDomain] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');

    // 체크박스 및 라디오 버튼 상태
    const [allChecked, setAllChecked] = useState(false);
    const [checkedItems, setCheckedItems] = useState({
        terms: false,
        privacy: false,
        marketing: false,
        sms: false,
        email: false
    });

    // 라디오 버튼 선택 상태
    const [selectedOption, setSelectedOption] = useState('');

    // 에러 상태
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [birthDateError, setBirthDateError] = useState('');

    // ref
    const inputRef = useRef(null);

    // DropDown option
    const addressOptions =[
        {value: "naver.com", label: "naver.com"},
        {value: "gmail.com", label: "gmail.com"},
        {value: "daum.net", label: "daum.net"},
        {value: "kakao.com", label: "kakao.com"},
        {value: 'custom', label: '직접입력'}
    ]

    // radio option
    const genderOptions =[
        {value: "M", label: "남자"},
        {value: "F", label: "여자"},
    ]


    // 전체 이메일 유효성 검사
    // const isValidFullEmail = (email, domain) => {
    //     if (!email) {
    //         setEmailError("이메일을 입력해주세요.");
    //         return false;
    //     }
    //
    //     if (!domain || domain === "선택하세요") {
    //         setEmailError("도메인을 선택해주세요.");
    //         return false;
    //     }
    //
    //     const fullEmail = `${email}@${domain}`;
    //     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    //
    //     if (!emailRegex.test(fullEmail)) {
    //         setEmailError("올바른 이메일 형식이 아닙니다.");
    //         return false;
    //     }
    //
    //     setEmailError(""); // 에러 초기화
    //     return true;
    // };

    // 개별 유효성 검사 함수
    // const isValidPassword = (password) => /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(password);
    // const isValidPhoneNumber = (phoneNumber) => /^01[0-9]-?\d{3,4}-?\d{4}$/.test(phoneNumber);
    // const isValidBirthDate = (birthDate) => /^\d{6}$/.test(birthDate);

    // const isValidEmail = (email) => {
    //     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    //     return emailRegex.test(email);
    // };
    // const isValidPassword = (password) => {
    //     const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    //     return passwordRegex.test(password);
    // };

    // const isValidPhoneNumber = (phoneNumber) => {
    //     const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/; // 한국 휴대전화 형식
    //     return phoneRegex.test(phoneNumber);
    // };

    // const isValidBirthDate = (birthDate) => {
    //     const birthRegex = /^\d{6}$/; // YYMMDD 형식
    //     return birthRegex.test(birthDate);
    // };

    /* 이벤트 핸들러 */

    // 이메일 필드
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        const error = validateEmail(value);
        setEmailError(error);

        // 실시간으로 전체 이메일 유효성 검사
        // if (!validateEmail(value, domain)) {
        //     return;
        // }
    };

    // 도메인 선택
    const handleDomainChange = (selectedValue) => {
        if (selectedValue === 'custom') {
        setDomain('custom');
            setTimeout(() => { inputRef.current?.focus(); // "직접 입력" 필드로 포커스 이동
            }, 0);
        } else {
            setDomain(selectedValue);
        }

        // 이메일 유효성 검사 수행
        const emailError = validateEmail(email, selectedValue); // 유효성 검사 결과 메시지
        setEmailError(emailError); // 에러 메시지 업데이트
        // if(!validateEmail(email, selectedValue)) return;
    };

    const handleCustomDomainChange = (e) => {
        const value = e.target.value;
        setCustomDomain(value); // "직접 입력" 값 업데이트

        const emailError = validateEmail(email, value); // "직접 입력" 값 사용
        setEmailError(emailError); // 에러 메시지 업데이트
    };

    // 비밀번호 필드
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        const error = validatePassword(value);
        setPasswordError(error);

        // if (!value) {
        //     setPasswordError("비밀번호를 입력해주세요.");
        // } else if (!isValidPassword(value)) {
        //     setPasswordError("비밀번호는 영문, 숫자, 특수문자를 포함하여 8~25자여야 합니다.");
        // } else {
        //     setPasswordError(""); // 에러 초기화
        // }
    };

    // 비밀번호 확인 필드
    const handlePasswordCheckChange = (e) => {
        const value = e.target.value;
        setPasswordCheck(value);

        if (value !== password) {
            setPasswordCheckError("비밀번호가 일치하지 않습니다.");
        } else {
            setPasswordCheckError(""); // 에러 초기화
        }
    };

    // 이름 필드
    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);

        if (!value) {
            setNameError("이름을 입력해주세요.");
        } else {
            setNameError(""); // 에러 초기화
        }
    };

    // 전화번호 필드
    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);

        const error = validatePhoneNumber(value);
        setPhoneNumberError(error);

        // if (value && !isValidPhoneNumber(value)) {
        //     setPhoneNumberError("올바른 휴대폰 번호를 입력해주세요. (예: 01012345678)");
        // } else {
        //     setPhoneNumberError(""); // 에러 초기화
        // }
    };

    // 생년월일 필드
    const handleBirthDateChange = (e) => {
        const value = e.target.value;
        setBirthDate(value);

        const error = validateBirthDate(value);
        setBirthDateError(error);

        // if (value && !isValidBirthDate(value)) {
        //     setBirthDateError("생년월일은 YYMMDD 형식으로 입력해주세요.");
        // } else {
        //     setBirthDateError(""); // 에러 초기화
        // }
    };

    // 체크박스
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

    const resetToDropdown = () => {
        setDomain(""); // 기본값으로 복원
    };



    /* 폼 제출 시 최종 유효성 검사 및 API요청 처리 */
    const handleSignup = async (e) => {
        e.preventDefault();
        let isValid = true;

        // 유효성 검사

        // 이메일 유효성 검사
        const emailError = validateEmail(email, domain);
        if(emailError){
            setEmailError(emailError);
            isValid = false;
        }else{
            setEmailError("");
        }

        // if (!email || !validateEmail(email,domain)) {
        //     setEmailError("올바른 이메일 주소를 입력해주세요.");
        //     isValid = false;
        // } else {
        //     setEmailError("");
        // }

        // 비밀번호 유효성 검사
        const passwordError = validatePassword(password);
        if(passwordError){
            setPasswordError(passwordError);
            isValid = false;
        }else{
            setPasswordError("");
        }
        // if (!password || !validatePassword(password)) {
        //     setPasswordError("비밀번호는 영문, 숫자, 특수문자를 포함하여 8~25자여야 합니다.");
        //     isValid = false;
        // } else {
        //     setPasswordError("");
        // }

        // 비밀번호 확인 유효성 검사
        if (password !== passwordCheck) {
            setPasswordCheckError("비밀번호가 일치하지 않습니다.");
            isValid = false;
        } else {
            setPasswordCheckError("");
        }

        // 이름 유효성 검사
        if (!name) {
            setNameError("이름을 입력해주세요.");
            isValid = false;
        } else {
            setNameError("");
        }

        // 전화번호 유효성 검사 (선택 항목, 입력된 경우만 확인)
        const phoneNumberError = validatePhoneNumber(phoneNumber);
        if (phoneNumberError) {
            setPhoneNumberError(phoneNumberError);
            isValid = false;
        }else{
            setPhoneNumberError("");
        }
        // if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
        //     setPhoneNumberError("올바른 휴대폰 번호를 입력해주세요. (예: 01012345678)");
        //     isValid = false;
        // } else {
        //     setPhoneNumberError("");
        // }

        // 생년월일 유효성 검사
        const { message: birthDateError, formatted } = validateBirthDate(birthDate);
        if (birthDateError) {
            setBirthDateError(birthDateError);
            isValid = false;
        } else {
            setBirthDateError("");
        }
        // const formattedBirthDate = birthDate.length === 6
        //     ?`${birthDate.startsWith("0") || birthDate.startsWith("1") ? "20" : "19"}${birthDate.slice(0, 2)}-${birthDate.slice(2, 4)}-${birthDate.slice(4, 6)}`
        //     : birthDate;
        //
        // if (birthDate && !validateBirthDate(birthDate)) {
        //     setBirthDateError("생년월일은 YYYY-MM-DD 형식으로 입력해주세요.");
        //     isValid = false;
        // } else {
        //     setBirthDateError("");
        // }

        // 필수 체크박스 유효성 검사
        if (!checkedItems.terms || !checkedItems.privacy) {
            alert("필수 동의 항목을 모두 체크해주세요.");
            isValid = false;
        }

        if (!isValid) {
            return; // 유효성 검사 실패 시 함수 종료
        }

        try {
            // API요청
            const response = await axiosInstance.post("/users/signup", {
                email: `${email}@${domain}`,
                password,
                name,
                phone: phoneNumber,
                birthDate: formatted,
                gender : selectedOption
            });
            // API응답 데이터 처리
            if (response.status === 201) {
                alert("회원가입이 성공적으로 완료되었습니다!");
                window.location.href = "/";
            }
        } catch (error) {
            console.error("회원가입 요청 실패:", error);
            if (error.response && error.response.status === 400) {
                alert("회원가입 중 오류가 발생했습니다: " + error.response.data.message);
            } else if (error.response && error.response.status === 500) {
                alert("김강민때문이다");
            }else {
                alert("서버와의 통신 중 문제가 발생했습니다. 다시 시도해주세요.");
            }
        }

    };


    return(
        <div className={"signup"}>
            <h2>회원가입</h2>
            <div className={"signup-container"}>
                <Form className={"signup-form"} onSubmit={handleSignup}>
                    <div className={"input-group"}>
                        <div className={"input-wrap"}>
                            <div className={"email-wrap"}>
                                <Input
                                    type={"text"}
                                    className={emailError ? "column error" : "column"}
                                    id={"email"}
                                    label={"이메일"}
                                    showLabel={true}
                                    placeholder={"이메일을 입력해주세요"}
                                    onChange={handleEmailChange}
                                />
                                <span>@</span>
                                {domain !== 'custom' ? (
                                    <DropDown
                                        className={emailError? "error" : ""}
                                        id={"domain"}
                                        options={addressOptions}
                                        value={domain}
                                        onChange={handleDomainChange}
                                    />
                                ) : (
                                        <InputWithButton
                                            ref={inputRef}
                                            className={emailError ? "error" : ""}
                                            type={"text"}
                                            id={"customDomain"}
                                            label={"직접입력"}
                                            placeholder={"직접입력"}
                                            value={customDomain}
                                            children={<FontAwesomeIcon
                                                icon={faXmark}
                                                className="close-icon"
                                                onClick={resetToDropdown}
                                            />}
                                            btnType={"button"}
                                            onChange={handleCustomDomainChange}
                                            onKeyDown={(e) => e.key === "Enter" && handleCustomDomainSubmit(e)}
                                        />

                               )}
                            </div>
                            {emailError && <p className="error-message">{emailError}</p>}
                            <Button type={"submit"} className={"submit-btn"}>이메일 인증</Button>
                        </div>
                        <div className={"input-wrap"}>
                            <Input
                                type={"password"}
                                className={passwordError ? "column error" : "column"}
                                id={"password"}
                                label={"비밀번호"}
                                showLabel={true}
                                placeholder={"비밀번호를 입력해주세요"}
                                onChange={handlePasswordChange}
                            />
                            {passwordError && <p className="error-message">{passwordError}</p>}
                        </div>
                        <div className={"input-wrap"}>
                            <Input
                                type={"password"}
                                className={passwordCheckError ? "column error" : "column"}
                                id={"passwordCheck"}
                                label={"비밀번호 확인"}
                                showLabel={true}
                                placeholder={"비밀번호를 확인해주세요"}
                                onChange={handlePasswordCheckChange}
                            />
                            {passwordCheckError && <p className="error-message">{passwordCheckError}</p>}
                        </div>
                        <div className={"input-wrap"}>
                            <Input
                                type={"text"}
                                className={nameError ? "column error" : "column"}
                                id={"name"}
                                label={"이름"}
                                showLabel={true}
                                placeholder={"이름을 입력해주세요"}
                                onChange={handleNameChange}
                            />
                            {nameError && <p className="error-message">{nameError}</p>}
                        </div>
                        <div className={"input-wrap"}>
                            <Input
                                type={"text"}
                                className={phoneNumberError ? "column error" : "column"}
                                id={"phoneNumber"}
                                label={"전화번호"}
                                showLabel={true}
                                placeholder={"전화번호를 입력해주세요"}
                                onChange={handlePhoneNumberChange}
                            />
                            {phoneNumberError && <p className="error-message">{phoneNumberError}</p>}
                        </div>
                        <div className={"input-wrap"}>
                            <Input
                            type={"text"}
                            className={birthDateError ? "column error" : "column"}
                            id={"birthDate"}
                            label={"생년월일"}
                            showLabel={true}
                            placeholder={"생년월일을 입력해주세요"}
                            maxLength={6}
                            onChange={handleBirthDateChange}
                            />
                            {birthDateError && <p className="error-message">{birthDateError}</p>}
                        </div>
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