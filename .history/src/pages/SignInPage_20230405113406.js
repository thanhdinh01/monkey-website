import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Field } from "../components/field";
import { Input, InputToggleIcon } from "../components/input";
import { Label } from "../components/label";
import HeadingAuthentication from "./HeadingAuthentication";
import { IconEyeClose, IconEyeOpen } from "../components/icon";
import { Button } from "../components/button";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/authContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required("Email must be required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters :)")
    .max(14)
    .required("Password must be required"),
});

const SignInPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [toggleEye, setToggleEye] = useState(true);
  const { authUser } = useAuth();
  const navigate = useNavigate();

  console.log("authUser:", authUser);

  useEffect(() => {
    if (authUser.email) navigate("/");
  }, [authUser, navigate]);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) {
      arrErrors.forEach((error) => {
        toast.error(error.message, {
          pauseOnHover: false,
          autoClose: 2000,
        });
      });
    }
  }, [errors]);

  const handleSignIn = async (data) => {
    try {
      setToggleEye(true);
      if (!isValid) return;
      console.log("data:", data);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success("Login successfully!", {
        pauseOnHover: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleEye = () => {
    setToggleEye(!toggleEye);
  };

  return (
    <HeadingAuthentication>
      <form action="" className="form" onSubmit={handleSubmit(handleSignIn)}>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            className="input"
            type="email"
            name="email"
            control={control}
            placeholder="Please enter your email address"
          />
          {errors?.email && (
            <span className="input-error">{errors?.email?.message}</span>
          )}
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputToggleIcon control={control}></InputToggleIcon>

          {errors?.password && (
            <span className="input-error">{errors?.password?.message}</span>
          )}
        </Field>
        <div className="have-account">
          You have not had an account?
          <NavLink to={"/sign-up"}>Register an account</NavLink>
        </div>
        <Button
          type="submit"
          className="btn-center"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          width="300px"
          kind="primary"
        >
          Log In
        </Button>
      </form>
    </HeadingAuthentication>
  );
};

export default SignInPage;