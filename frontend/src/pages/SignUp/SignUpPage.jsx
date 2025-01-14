import "./SignUpPage.scss";

import Form from "../../components/Form";
import Input from "../../components/Input/Input";
import DropDown from "../../components/DropDown/DropDown";
import Button from "../../components/Button/Button";
import RadioButton from "../../components/RadioButton/RadioButton";
import CheckBox from "../../components/CheckBox/CheckBox";
import {useEffect, useRef, useState} from "react";
import InputWithButton from "../../components/Input/InputWithButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {
    validateBirthDate,
    validateEmail,
    validatePassword,
    validatePhoneNumber,
    validateVerificationCode
} from "../../utils/validation";
import {checkEmail, emailSend, emailVerify, signup} from "../../utils/api";
import Step2CodeVerification from "../PasswordReset/Step2CodeVerification";

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

    const [verificationCode, setVerificationCode] = useState('');
    const [verificationCodeError, setVerificationCodeError] = useState('');
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [time, setTime] = useState(180); // 3분 타이머

    // const [emailAddress, setEmailAddress] = useState('');
    const [isVerificationButtonEnabled, setIsVerificationButtonEnabled] = useState(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isCodeConfirmed, setIsCodeConfirmed] = useState(false);

    const contentRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

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

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

    useEffect(() => {
        if (isTimerActive && time > 0) {
            const timer = setTimeout(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (isTimerActive && time === 0) {
            setIsTimerActive(false);
            setVerificationCodeError("인증 시간이 만료되었습니다. 다시 요청해주세요.");
        }
    }, [time, isTimerActive]);

    useEffect (() => {
        const content = contentRef.current;
        if(content) {
            content.style.maxHeight = isVisible
            ? `${content.scrollHeight}px`
            : "0";
        }
    },[isVisible])


    /* 이벤트 핸들러 */

    // 이메일 필드
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        const currentDomain = domain === 'custom' ? customDomain : domain;
        const error = validateEmail(value, currentDomain);
        setEmailError(error);
        setIsEmailValid(!error);

        setIsButtonDisabled(!!error || !currentDomain);

        // // 이메일과 도메인이 모두 유효한지 확인
        // if (!error && currentDomain) {
        //     setIsButtonDisabled(false); // 버튼 활성화
        // } else {
        //     setIsButtonDisabled(true); // 버튼 비활성화
        // }
    };

    // 드롭다운 도메인 선택
    const handleDomainChange = (selectedValue) => {
        if (selectedValue === 'custom') {
            setDomain('custom');
            setTimeout(() => { inputRef.current?.focus(); // "직접 입력" 필드로 포커스 이동
            }, 0);
        } else {
            setDomain(selectedValue);
            const error = validateEmail(email, selectedValue);
            setEmailError(error); // 에러 메시지 업데이트
            setIsEmailValid(!error);

            setIsButtonDisabled(!!error || !email);

            // // 이메일과 도메인이 모두 유효한지 확인
            // if (!error && email) {
            //     setIsButtonDisabled(false); // 버튼 활성화
            // } else {
            //     setIsButtonDisabled(true); // 버튼 비활성화
            // }
        }
    };
    // 도메인 상태 업데이트 유효성검사(직접입력)
    const handleCustomDomainChange = (e) => {
        const value = e.target.value;
        setCustomDomain(value); // "직접 입력" 값 업데이트

        const error = validateEmail(email, value);
        setEmailError(error); // 에러 메시지 업데이트
        setIsEmailValid(!error);

        // 이메일과 도메인이 모두 유효한지 확인
        if (!error && email) {
            setIsButtonDisabled(false); // 버튼 활성화
        } else {
            setIsButtonDisabled(true); // 버튼 비활성화
        }
    };

    // 최종 도메인
    const handleCustomDomainSubmit = (e) => {
        e.preventDefault();
        if (customDomain.trim() !== '') {
            setDomain(customDomain);
        }
    };

    // 도메인 기본값으로 복원
    const resetToDropdown = () => {
        setDomain("");
    };

    // 인증 코드 입력
    const handleVerificationCodeChange = (e) => {
        const value = e.target.value.trim();
        setVerificationCode(value);

        const error = validateVerificationCode(value);
        setVerificationCodeError(error);

        // 입력값이 유효하면 버튼 활성화
        setIsVerificationButtonEnabled(value.length > 0 && !error);
        //
        // if (error) {
        //     setVerificationCodeError(error);
        //     setIsButtonDisabled(true);
        // } else {
        //     setVerificationCodeError('');
        //     setIsButtonDisabled(false);
        // }
    };


    // 비밀번호 필드
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(validatePassword(value));
    };

    // 비밀번호 확인 필드
    const handlePasswordCheckChange = (e) => {
        const value = e.target.value;
        setPasswordCheck(value);
        setPasswordCheckError(value !== password ? "비밀번호가 일치하지 않습니다." : "");
    };

    // 이름 필드
    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
        setNameError(value.trim() === "" ? "이름을 입력해주세요." : "");
    };

    // 전화번호 필드
    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
        setPhoneNumberError(validatePhoneNumber(value));
    };

    // 생년월일 필드
    const handleBirthDateChange = (e) => {
        const value = e.target.value;
        setBirthDate(value);
        const { message } = validateBirthDate(value);
        setBirthDateError(message);
    };

    // 라디오 버튼
    const handleRadioOptionChange = (value) => {
        console.log("선택된 옵션:", value);
        setSelectedOption(value);
    }

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
        });
    };
    // 체크박스 상태
    const handleItemChange = (key) => {
        setCheckedItems((prev) => {
            const newCheckedItems = {...prev, [key] : !prev[key]};
            setAllChecked(Object.values(newCheckedItems).every((val) => val));
            return newCheckedItems;
        });
    };

    const handleSendCode = async (e) => {
        e.preventDefault();

        console.log("전달된 email:", email);
        console.log("전달된 verificationCode:", verificationCode);

        const verificationCodeError = validateVerificationCode(verificationCode);
        if (verificationCodeError) {
            setVerificationCodeError(verificationCodeError);
            return;
        }

        try {
            const response = await emailVerify({ email: email, code: verificationCode });
            alert("인증이 완료되었습니다.");
            setIsTimerActive(false);
            setIsCodeConfirmed(true);
            setIsVisible(false);

        } catch (error) {
            console.error("Error:", error);
            setVerificationCodeError("인증 코드가 유효하지 않습니다.");
        }
    };

    const handleEmailVerification = async (e) => {
        e.preventDefault();

        const currentDomain = domain === 'custom' ? customDomain : domain;
        const emailAddress = `${email}@${currentDomain}`;

        setEmail(emailAddress);

        console.log("handleEmailVerification 호출됨");

        const emailError = validateEmail(emailAddress);
        if (emailError) {
            setEmailError(emailError);
            return;
        }

        try {
            // 이메일 중복 확인
            const checkResponse = await checkEmail(emailAddress);
            if (checkResponse.available) {
                // 이메일 사용 가능
                setIsVisible(true);
                setIsButtonDisabled(true);
                alert("사용 가능한 이메일입니다.");

                // 인증 이메일 발송
                const sendResponse = await emailSend(emailAddress);
                console.log("API 응답:", sendResponse);
                alert("인증 이메일이 발송되었습니다. 이메일을 확인해주세요.");
                setTime(180);
                setIsTimerActive(true);
                setIsCodeConfirmed(false);
                setEmailError("");
                setIsEmailInvalid(false);
            } else {
                // 이미 가입된 이메일
                setEmailError("이미 가입한 이메일입니다.");
                setIsVisible(false);
            }
        } catch (error) {
            console.error("에러 발생:", error);
            alert(error.message || "문제가 발생했습니다.");
        }

    }

    // 이메일 인증
    // const handleSendEmail = async (e) => {
    //     e.preventDefault();
    //     // 유효성 검사 실패 시 중단
    //     // const emailError = validateEmail(emailAddress);
    //     // if (emailError) {
    //     //     setEmailError(emailError);
    //     //     return;
    //     // }
    //
    //     console.log("버튼이 클릭")
    //     try {
    //         const response = await emailSend(emailAddress);
    //         console.log("API 응답:", response);
    //         alert("인증 이메일이 발송되었습니다. 이메일을 확인해주세요.");
    //         setTime(180);
    //         setIsTimerActive(true);
    //         setIsCodeConfirmed(false);
    //         setEmailError("")
    //         setIsEmailInvalid(false);
    //     } catch (error) {
    //         console.error("Error:", error);
    //         console.log(error.statusCode);
    //         alert(error.message || "이메일 발송 중 문제가 발생했습니다.");
    //     }
    // };

    //이메일 존재 확인 API요청
    // const handleCheckEmail = async (e) => {
    //     // e.preventDefault();
    //     // const currentDomain = domain === 'custom' ? customDomain : domain;
    //     // const emailAddress = `${email}@${currentDomain}`;
    //
    //     console.log("handleCheckEmail 호출됨");
    //     try{
    //         // const response = await checkEmail(emailAddress);
    //         if (response.available) {
    //             // 존재하지 않은 이메일일 경우
    //             // setIsButtonDisabled(true);
    //             // setIsVisible(true);
    //             // alert("사용 가능한 이메일입니다.");
    //         } else {
    //             // 유효한 이메일일 경우
    //             setEmailError("이미 가입한 이메일입니다.");
    //             setIsVisible(false);
    //         }
    //
    //     }catch (error){
    //         console.error("에러 발생:", error);
    //         alert(error.message || "문제가 발생했습니다.");
    //     }
    //
    // }
   // 이메일 재전송

    // 이메일 재전송
    const handleResendEmail = async (e) => {
        e.preventDefault();

        try {
            const response = await emailSend(email);
            alert("이메일이 재전송되었습니다. 받은 편지함을 확인해주세요.");
            setTime(180);
            setIsTimerActive(true);
            setIsCodeConfirmed(false);
        } catch (error) {
            console.error("Error:", error);
            alert(error.message || "이메일 재전송 중 문제가 발생했습니다.");
        }
    };

    /* 폼 제출 시 최종 유효성 검사 및 API요청 처리 */
    const handleSignup = async (e) => {
        e.preventDefault();

        // 최종 도메인 결정 (직접 입력인지 확인)
        // const currentDomain = domain === 'custom' ? customDomain : domain;
        let isValid = true;

        console.log(email);
        // 이메일 유효성 검사
        const emailError = validateEmail(email);
        if(emailError){
            setEmailError(emailError);
            isValid = false;
        }

        // 비밀번호 유효성 검사
        const passwordError = validatePassword(password);
        if(passwordError){
            setPasswordError(passwordError);
            isValid = false;
        }

        // 비밀번호 확인 유효성 검사
        if (passwordCheck.trim() === "") {
            setPasswordCheckError("확인을 위해 비밀번호를 한 번 더 입력해주세요.");
            isValid = false;
        } else if (passwordCheck !== password) {
            setPasswordCheckError("비밀번호가 일치하지 않습니다.");
            isValid = false;
        } else {
            setPasswordCheckError("");
        }


        // 이름 유효성 검사
        if (name.trim() === "") {
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

        // 생년월일 유효성 검사
        const { message, formatted } = validateBirthDate(birthDate);
        if (message) {
            setBirthDateError(message);
            isValid = false;
        } else {
            setBirthDateError("");
        }

        // 필수 체크박스 유효성 검사
        if (!checkedItems.terms || !checkedItems.privacy) {
            alert("필수 동의 항목을 모두 체크해주세요.");
            isValid = false;
        }

        if (!isValid) {
            console.log("유효성 검사 실패로 함수 종료")
            // setIsButtonDisabled(true);
            setEmailError(""); // 필요 시 초기화
            setPasswordError(""); // 필요 시 초기화
            return
        };

        try {
            // API요청
            const userData={
                email,
                password,
                name,
                phone: phoneNumber,
                birthDate: formatted,
                gender : selectedOption
            };
            const response = await signup(userData);

            // API응답 데이터 처리
                alert("회원가입이 성공적으로 완료되었습니다!");
                window.location.href = "/";
        } catch (error) {
            if (error.message) {
                alert(`회원가입 실패: ${error.statusCode}, ${error.message}`);
            } else {
                alert("알 수 없는 문제가 발생했습니다. 다시 시도해주세요.");
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
                                            btnClassName={"close"}
                                            onChange={handleCustomDomainChange}
                                            onKeyDown={(e) => e.key === "Enter" && handleCustomDomainSubmit(e)}
                                        />

                               )}
                            </div>
                            {emailError && <p className="error-message">{emailError}</p>}
                            <Button
                                className={`submit-btn ${!isEmailValid || isButtonDisabled ? "disabled-btn" : ""}`}
                                disabled={!isEmailValid || isButtonDisabled}
                                onClick={handleEmailVerification}
                            >
                                이메일 인증
                            </Button>
                            <div
                                className={`code-wrap ${isVisible ? "" : "hidden"}`}
                                ref={contentRef}
                            >
                                <div className={"code-group"}>
                                    {isVisible && <Step2CodeVerification
                                        verificationCode={verificationCode}
                                        verificationCodeError={verificationCodeError}
                                        isTimerActive={isTimerActive}
                                        time={time}
                                        isCodeConfirmed={isCodeConfirmed}
                                        // isButtonDisabled={isButtonDisabled}
                                        btnDisabled={!isVerificationButtonEnabled}
                                        handleVerificationCodeChange={handleVerificationCodeChange}
                                        handleSendCode={handleSendCode}
                                        handleResendEmail={handleResendEmail}
                                        formatTime={formatTime}
                                    />}
                                </div>
                            </div>
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
                    <Button type="submit">회원가입</Button>
                </Form>
            </div>
        </div>
    );
};

export default SignUpPage;