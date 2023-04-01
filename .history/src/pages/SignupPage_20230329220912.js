import React from "react";
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { IconEyeOpen } from "../components/icon";
import { Input } from "../components/input";
import { Label } from "../components/label";

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
  .field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
  }
`;

const schema=

const SignupPage = () => {
  const { control, handleSubmit } = useForm({});

  const handleSignUp = (data) => {
    console.log(data);
  };
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
          <div className="field">
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              className="input"
              type="text"
              name="fullname"
              control={control}
              placeholder="Please enter your fullname"
            >
              <IconEyeOpen className="input-icon"></IconEyeOpen>
            </Input>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </SignupPageStyled>
  );
};

export default SignupPage;
