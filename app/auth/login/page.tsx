"use client";
import Link from "next/link";
import { useState } from "react";
import {signIn} from 'next-auth/react';
import Image from 'next/image';

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
    <div className="mx-auto max-w-md border p-10 border-gray-300">
      <Image
        src="/logo.png" 
        alt="Check Into Class Logo" 
        width={200} 
        height={100}
        className="flex justify-center"
      />
      <h3 className="flex content-center">Instructor Login </h3>

      {alert.message && 
        <div style={{ 
          color: alert.status === 'success' ? 'green' : 'red',
          fontWeight: 'bold'
        }}>   
          {alert.status === 'success' ? '✅' : '❌'} {alert.message}
        </div>
      }
      <form onSubmit={onSubmit}> 
        {/* /* // will be integrated with next-auth */ }
        <div>
          <label htmlFor="email">Email </label>
          <br />
          <input className="input input-bordered w-full border rounded-sm border-gray-300 mb-4 mt-2 max-w-xs "
            onChange={onChange}
            value={loginData.email}
            type="email"
            name="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password </label>
          <input className="input input-bordered w-full border rounded-sm border-gray-300  mb-4 mt-2 max-w-xs"
            onChange={onChange}
            value={loginData.password}
            type="password"
            name="password"
            required
          />
        </div>
        <br />
        <input
      id="remember-me"
      name="remember-me"
      type="checkbox"
      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
    />
    <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
      Remember me
    </label>
        <br />
        <button className="btn btn-primary flex justify-center" type="submit">Login</button>
      </form>
      <br />
      <a className="btn btn-secondary flex justify-center ">I'm a Student</a>
      <br />
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
