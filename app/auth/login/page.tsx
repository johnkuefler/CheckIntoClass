"use client";
import Link from "next/link";
import { useState } from "react";
import {signIn} from 'next-auth/react';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await signIn("credentials", loginData);
      setAlert({ status: "success", message: "Login successfully" });
      setLoginData({ email: "", password: "" });
    } catch (error: any) {
      console.log({ error });
      setAlert({ status: "error", message: "Something went wrong" });
    }
  };  

  return (
    <div>
      <h3>Login Page</h3>
      {alert.message && 
        <div style={{ 
          color: alert.status === 'success' ? 'green' : 'red',
          fontWeight: 'bold'
        }}>   
          {alert.status === 'success' ? '✅' : '❌'} {alert.message}
        </div>
      }
      <form onSubmit={onSubmit}> // will be integrated with next-auth
        <div>
          <label htmlFor="email">Email </label>
          <input
            onChange={onChange}
            value={loginData.email}
            type="email"
            name="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password </label>
          <input
            onChange={onChange}
            value={loginData.password}
            type="password"
            name="password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        Do not have an account?{" "}
        <Link href="/auth/register">Create an account</Link>
      </div>
    </div>
  );
};

export default LoginPage;