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
      const result = await signIn("credentials", {
        ...loginData,
        redirect: false,
        callbackUrl: '/mainpage', // Replace '/mainpage' with your main page's path
      });
  
      if (!result.error) {
        // Redirect to callback URL
        window.location.href = '/';
      } else {
        // Handle error case
        setAlert({ status: "error", message: result.error });
      }
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
          <input className="input input-bordered w-full max-w-xs"
            onChange={onChange}
            value={loginData.email}
            type="email"
            name="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password </label>
          <input className="input input-bordered w-full max-w-xs"
            onChange={onChange}
            value={loginData.password}
            type="password"
            name="password"
            required
          />
        </div>
        <button className="btn btn-primary"  type="submit">Login</button>
      </form>
      <div>
        Do not have an account?{" "}
        <div>
        <a className="btn btn-secondary" href="/auth/register">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
