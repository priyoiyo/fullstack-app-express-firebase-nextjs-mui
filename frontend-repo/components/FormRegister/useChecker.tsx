/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";

interface PasswordProps {
  password1: string;
  password2: string;
}
interface PasswordChecker {
  barValue: number;
  emoticon: React.ReactNode;
  helper: string;
  color:
    | "error"
    | "primary"
    | "inherit"
    | "secondary"
    | "info"
    | "success"
    | "warning";
}

const useChecker = (passwordProps: PasswordProps) => {
  const [password, setPassword] = useState(passwordProps);
  const [passwordMatch, setPasswordMatch] = useState(<></>);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [passwordChecker, setPasswordChecker] = useState<PasswordChecker>({
    barValue: 0,
    emoticon: "",
    helper: "",
    color: "primary",
  });
  const handleChangePassword1 = (event: any) => {
    setPassword({ ...password, password1: event.target.value });
  };
  const handleChangePassword2 = (event: any) => {
    setPassword({ ...password, password2: event.target.value });
  };
  const checkAlphanumeric = (props: string) => {
    return /\d/.test(props);
  };
  const checkCapitalize = (props: string) => {
    return props.toLowerCase() !== props;
  };
  const checkSymbol = (props: string) => {
    return /[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(props);
  };
  const checkPasswordMatch = (props: PasswordProps) => {
    return props.password1 == props.password2;
  };

  useEffect(() => {
    if (
      password.password1.length >= 12 &&
      checkAlphanumeric(password.password1) &&
      checkCapitalize(password.password1) &&
      checkSymbol(password.password1)
    ) {
      setPasswordChecker({
        barValue: 90,
        emoticon: (
          <div style={{ color: "green" }}>
            <span>Strong &#128526;</span>
          </div>
        ),
        helper: "Your password is great! Nice work!",
        color: "success",
      });
    } else if (
      password.password1.length >= 8 &&
      password.password1.length < 12 &&
      checkAlphanumeric(password.password1) &&
      checkCapitalize(password.password1) &&
      checkSymbol(password.password1)
    ) {
      setPasswordChecker({
        barValue: 60,
        emoticon: (
          <div style={{ color: "orange" }}>
            <span>Average &#128534;</span>
          </div>
        ),
        helper: "Your password is easily guessable. You can do better.",
        color: "warning",
      });
    } else if (!password.password1) {
      setPasswordChecker({
        barValue: 0,
        emoticon: "",
        helper: "",
        color: "primary",
      });
    } else {
      setPasswordChecker({
        barValue: 20,
        emoticon: (
          <div style={{ color: "red" }}>
            <span>Weak &#128553;</span>
          </div>
        ),
        helper: "Your is easily guessable. You can do better.",
        color: "error",
      });
    }
    if (password.password1.length >= 8 && password.password2.length > 0) {
      if (checkPasswordMatch(password)) {
        setIsPasswordMatch(true);
        setPasswordMatch(
          <span style={{ fontWeight: "bold" }}>&#9989; Password Match </span>
        );
      } else {
        setIsPasswordMatch(false);
        setPasswordMatch(
          <span style={{ fontWeight: "bold" }}>
            &#10060; Password Doesn't Match{" "}
          </span>
        );
      }
    } else {
      setIsPasswordMatch(false);
      setPasswordMatch(<></>);
    }
  }, [password]);
  return {
    password,
    handleChangePassword1,
    handleChangePassword2,
    passwordChecker,
    passwordMatch,
    isPasswordMatch,
  };
};

export default useChecker;
