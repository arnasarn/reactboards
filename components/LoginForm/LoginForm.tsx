import React, { useState } from "react";
import styles from "./loginForm.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { login } from "@/pages/api/fetch";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);

  const [isEmailValid, setEmailValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);

  const router = useRouter();

  const emailValid = (value: string) => {
    if (value.length < 3) setEmailValid(false);
    else setEmailValid(true);
  };

  const passwordValid = (value: string) => {
    if (value.length < 3) setPasswordValid(false);
    else setPasswordValid(true);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const loginData = {
        email: email,
        password: password,
      };

      const response = await login(loginData);

      if (response.status === 200) {
        Cookies.set("@user_jwt", response.data.jwt);
        setTimeout(() => {
          router.push("/");
        }, 1000);
        return;
      }

      setError(true);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <form className={styles.main} onSubmit={(e) => onSubmit(e)}>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          emailValid(e.target.value);
        }}
      />
      {!isEmailValid && <p className={styles.error}>Email is too short</p>}
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          passwordValid(e.target.value);
        }}
      />
      {!isPasswordValid && (
        <p className={styles.error}>Password is too short</p>
      )}
      <button type="submit">Login</button>
      {isError && (
        <p className={styles.error}>Your email or password is wrong</p>
      )}
    </form>
  );
};

export default LoginForm;
