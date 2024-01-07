"use client";
import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(registerData),
      });
      setAlert({ status: "success", message: "Signup successfully" });
      setRegisterData({ firstName: "", lastName:"", email: "", password: "" });
    } catch (error: any) {
      console.log({ error });
      setAlert({ status: "error", message: "Something went wrong" });
    }
  };

  return (
    <div>
      <h3>Register Page</h3>
      {alert.message && (
        <div
          style={{
            color: alert.status === "success" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {alert.status === "success" ? "✅" : "❌"} {alert.message}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            onChange={onChange}
            value={registerData.firstName}
            type="text"
            name="firstName"
            required
          />
        </div>
        <div>
          <label htmlFor="name">Last Name</label>
          <input
            onChange={onChange}
            value={registerData.lastName}
            type="text"
            name="lastName"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={onChange}
            value={registerData.email}
            type="email"
            name="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={onChange}
            value={registerData.password}
            type="password"
            name="password"
            required
          />
        </div>
        <button type="submit">Create account</button>
      </form>
      <div>
        Already have an account? <Link href="/auth/login">Login here</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
