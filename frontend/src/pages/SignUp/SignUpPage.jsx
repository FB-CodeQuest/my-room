import "./SignUpPage.scss";

import Form from "../../components/Form";
import Input from "../../components/Input/Input";
import DropDown from "../../components/DropDown/DropDown";
import Button from "../../components/Button/Button";
import RadioButton from "../../components/RadioButton/RadioButton";
import CheckBox from "../../components/CheckBox/CheckBox";
import axiosInstance from "../../utils/axiosInstance";

import {useRef, useState} from "react";

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
    const [domainError, setDomainError] = useState('');

    // ref
    const inputRef = useRef(null);
    const [userId, setUserId] = useState('');
    // const [phone, setPhone] = useState('');
    // const [genderError, setGenderError] = useState('');

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
        {value: "male", label: "남자"},
        {value: "female", label: "여자"},
    ]


    // 전체 이메일 유효성 검사
    const isValidFullEmail = (email, domain) => {
        if (!email) {
            setEmailError("이메일을 입력해주세요.");
            return false;
        }

        if (!domain || domain === "선택하세요") {
            setEmailError("도메인을 선택해주세요.");
            return false;
        }

        const fullEmail = `${email}@${domain}`;
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!emailRegex.test(fullEmail)) {
            setEmailError("올바른 이메일 형식이 아닙니다.");
            return false;
        }

        setEmailError(""); // 에러 초기화
        return true;
    };

    // 개별 유효성 검사 함수
    // const isValidPassword = (password) => /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(password);
    // const isValidPhoneNumber = (phoneNumber) => /^01[0-9]-?\d{3,4}-?\d{4}$/.test(phoneNumber);
    // const isValidBirthDate = (birthDate) => /^\d{6}$/.test(birthDate);

    // const isValidEmail = (email) => {
    //     const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    //     return emailRegex.test(email);
    // };
    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        return passwordRegex.test(password);
    };

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/; // 한국 휴대전화 형식
        return phoneRegex.test(phoneNumber);
    };

    const isValidBirthDate = (birthDate) => {
        const birthRegex = /^\d{6}$/; // YYMMDD 형식
        return birthRegex.test(birthDate);
    };

    /* 이벤트 핸들러 */

    // 이메일 필드
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        // 실시간으로 전체 이메일 유효성 검사
        if (!isValidFullEmail(value, domain)) {
            return;
        }
    };

    // 도메인 선택
    const handleDomainChange = (selectedValue) => {
        setDomain('custom');

        if (selectedValue === 'custom') {
            setTimeout(() => { inputRef.current?.focus(); // "직접 입력" 필드로 포커스 이동
            }, 0);
        }

        if(!isValidFullEmail(email, selectedValue)) return;
    };

    const handleCustomDomainChange = (e) => {
        setCustomDomain(e.target.value); // "직접 입력" 값 업데이트
    };

    // 비밀번호 필드
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (!value) {
            setPasswordError("비밀번호를 입력해주세요.");
        } else if (!isValidPassword(value)) {
            setPasswordError("비밀번호는 영문, 숫자, 특수문자를 포함하여 8~25자여야 합니다.");
        } else {
            setPasswordError(""); // 에러 초기화
        }
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

    // 전화번호 필드 ]
    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);

        if (value && !isValidPhoneNumber(value)) {
            setPhoneNumberError("올바른 휴대폰 번호를 입력해주세요. (예: 01012345678)");
        } else {
            setPhoneNumberError(""); // 에러 초기화
        }
    };

    // 생년월일 필드
    const handleBirthDateChange = (e) => {
        const value = e.target.value;
        setBirthDate(value);

        if (value && !isValidBirthDate(value)) {
            setBirthDateError("생년월일은 YYMMDD 형식으로 입력해주세요.");
        } else {
            setBirthDateError(""); // 에러 초기화
        }
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



    /* 폼 제출 시 최종 유효성 검사 및 API요청 처리 */
    const handleSignup = async (e) => {
        e.preventDefault();
        let isValid = true;

        // 유효성 검사

        // 이메일 유효성 검사
        if (!email || !isValidFullEmail(email)) {
            setEmailError("올바른 이메일 주소를 입력해주세요.");
            isValid = false;
        } else {
            setEmailError("");
        }

        // 비밀번호 유효성 검사
        if (!password || !isValidPassword(password)) {
            setPasswordError("비밀번호는 영문, 숫자, 특수문자를 포함하여 8~25자여야 합니다.");
            isValid = false;
        } else {
            setPasswordError("");
        }

        // 비밀번호 확인 유효성 검사
        if (!passwordCheck || password !== passwordCheck) {
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
        if (phoneNumber && !isValidPhoneNumber(phoneNumber)) {
            setPhoneNumberError("올바른 휴대폰 번호를 입력해주세요. (예: 01012345678)");
            isValid = false;
        } else {
            setPhoneNumberError("");
        }

        // 생년월일 유효성 검사 (선택 항목, 입력된 경우만 확인)
        if (birthDate && !isValidBirthDate(birthDate)) {
            setBirthDateError("생년월일은 YYMMDD 형식으로 입력해주세요.");
            isValid = false;
        } else {
            setBirthDateError("");
        }

        // 필수 체크박스 유효성 검사
        if (!checkedItems.terms || !checkedItems.privacy) {
            alert("필수 동의 항목을 모두 체크해주세요.");
            isValid = false;
        }

        // // 유효성 검사를 통과하지 못하면 폼 제출 차단
        // if (!isValid) {
        //     alert("폼을 올바르게 작성해주세요!");
        //     return;
        // }

        try {
            // API요청
            const response = await axiosInstance.post("/api/users/signup", {
                userId,
                email: `${email}@${domain}`,
                password,
                name,
                phone: phoneNumber,
                birthDate,
                gender
            });
            // API응답 데이터 처리
            if (response.status === 200) {
                const {name} = response.data;
                alert(`환영합니다,${name}님!`);
                window.location.href = "/";
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("회원가입 중 오류가 발생했습니다: " + error.response.data.message);
            }
        }

    };





    // 이메일 유효성 검사 핸들러
    //     const handleEmailChange = (e) => {
    //         const value = e.target.value;
    //         setEmail(value);
    //
    //         // 이메일 필드만 초기 검사
    //         if (!value) {
    //             setEmailError("이메일을 입력해주세요.");
    //         } else {
    //             setEmailError(""); // 에러 초기화
    //         }
    //     };

    // 도메인 선택 핸들러
    //     const handleDomainChange = (selectedValue) => {
    //         setDomain(selectedValue);
    //
    //         // 도메인 선택 여부 확인
    //         if (!selectedValue || selectedValue === "선택하세요") {
    //                setDomainError("도메인을 선택해주세요.");
    //         } else {
    //             setDomainError(""); // 에러 초기화
    //         }
    //     };

    // const handleDomainChange = (selectedValue) => {
    //     setDomain(selectedValue);
    //
    //     // 실시간으로 전체 이메일 유효성 검사
    //     if (!isValidFullEmail(email, selectedValue)) {
    //         return;
    //     }
    // };

    // const handleDomainChange = (selectedValue) => {
    //     if (selectedValue === "custom") {
    //         setDomain("custom");
    //         setTimeout(() => {
    //             inputRef.current?.focus(); // "직접 입력" 필드로 포커스 이동
    //         }, 0);
    //     } else {
    //         setDomain(selectedValue);
    //     }
    //
    //     // 도메인 선택 여부 확인
    //     if (!selectedValue || selectedValue === "선택하세요") {
    //         setDomainError("도메인을 선택해주세요.");
    //     } else {
    //         setDomainError(""); // 에러 초기화
    //     }
    // };

    // // 유효성 검사 통합
    //     const validateFullEmail = () => {
    //         if (!isValidFullEmail(email, domain)) {
    //             setEmailError("올바른 이메일 주소를 입력해주세요.");
    //             return false;
    //         }
    //         return true;
    //     };
    //



    // 이메일 유효성 검사
    // const handleEmailChange = (e) => {
    //     const value = e.target.value;
    //     setEmail(value);
    //
    //     if (!value) {
    //         setEmailError("이메일을 입력해주세요.");
    //     } else if (!isValidEmail(value)) {
    //         setEmailError("올바른 이메일 형식이 아닙니다.");
    //     } else {
    //         setEmailError(""); // 에러 초기화
    //     }
    // };




    return(
        <div className={"signup"}>
            <h2>회원가입</h2>
            <div className={"signup-container"}>
                <Form className={"signup-form"} onSubmit={handleSignup}>
                    <div className={"input-group"}>
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
                                    <Input
                                        ref={inputRef}
                                        className={emailError ? "column error" : "column"}
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
                        {emailError && <p className="error-message">{emailError}</p>}
                        <Button type={"submit"} className={"submit-btn"}>이메일 인증</Button>
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
                        <RadioButton
                            groupLabel={"성별"}
                            name={"gender"}
                            selected={selectedOption}
                            options={genderOptions}
                            onChange={handleRadioOptionChange}
                        />
                        {/*{genderError && <p className="error-message">{genderError}</p>}*/}
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