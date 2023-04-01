import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Field } from "../components/field";
import { Button } from "../components/button";
import { toast } from "react-toastify";

const SignupPageStyled = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo-singup {
    margin: 0 auto 20px;
  }
  .heading {
    color: ${(props) => props.theme.primary};
    text-align: center;
    margin-bottom: 60px;
    font-size: 40px;
  }
  .form {
    max-width: 800px;
    margin: 0 auto;
  }
`;

const schema = yup.object().shape({
  fullname: yup.string().required("Fullname must be required"),
  email: yup.string().email().required("Email must be required"),
  password: yup.string().min(8).max(14).required("Password must be required"),
});

const SignupPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log("errors:", errors);
  const [toggleEye, setToggleEye] = useState(true);

  const handleToggleEye = () => {
    setToggleEye(!toggleEye);
  };

  const handleSignUp = (data) => {
    setToggleEye(true);
    return new Promise((resolver) => {
      setTimeout(() => {
        resolver();
        console.log(data);
      }, 3000);
    });
  };

  useEffect(() => {
    const arrErrorsValidation = Object.values(errors);
    console.log(arrErrorsValidation);
    if (arrErrorsValidation.length > 0) {
      toast.error(arrErrorsValidation[0].message, {
        pauseOnHover: false,
        autoClose: 2000,
      });
    }
  }, [errors]);
  return (
    <SignupPageStyled>
      <div className="container">
        <img
          src={require("../images/logo-signup.png")}
          alt="logo sign up"
          className="logo-singup"
        />
        <h1 className="heading">Monkey Blogging</h1>
        <form action="" className="form" onSubmit={handleSubmit(handleSignUp)}>
          <Field>
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              className="input"
              type="text"
              name="fullname"
              control={control}
              placeholder="Please enter your fullname"
            />
            <span>{errors?.fullname?.message}</span>
          </Field>
          <Field>
            <Label htmlFor="email">Email address</Label>
            <Input
              className="input"
              type="email"
              name="email"
              control={control}
              placeholder="Please enter your email address"
            />
            <span></span>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              className="input"
              type={toggleEye ? "password" : "text"}
              name="password"
              control={control}
              placeholder="Please enter your password"
            >
              {toggleEye ? (
                <IconEyeOpen
                  onClick={handleToggleEye}
                  className="input-icon"
                ></IconEyeOpen>
              ) : (
                <IconEyeClose
                  onClick={handleToggleEye}
                  className="input-icon"
                ></IconEyeClose>
              )}
            </Input>
            <span></span>
          </Field>
          <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </SignupPageStyled>
  );
};

export default SignupPage;
