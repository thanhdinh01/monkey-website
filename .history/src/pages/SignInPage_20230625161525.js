import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Field } from "../components/field";
import { Input, InputToggleIcon } from "../components/input";
import { Label } from "../components/label";
import HeadingAuthentication from "./HeadingAuthentication";
import { Button } from "../components/button";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/authContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email must be required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
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

  const { authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser?.email) navigate("/");
  }, [authUser, navigate]);
  useEffect(() => {
    document.title = "Monkey Sign In";
  }, []);

  const handleSignIn = async (data) => {
    try {
      if (!isValid) return;
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success(`Logined ${data.email} successfully!`, {
        pauseOnHover: false,
        autoClose: 1500,
      });
    } catch (error) {
      toast.error("Authentication Failed", {
        pauseOnHover: false,
        autoClose: 1500,
      });
    }
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
