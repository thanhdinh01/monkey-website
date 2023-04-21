import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Field } from "../components/field";
import { Button } from "../components/button";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import HeadingAuthentication from "./HeadingAuthentication";
import { NavLink, useNavigate } from "react-router-dom";
import InputToggleIcon from "../components/input/InputToggleIcon";

const schema = yup.object().shape({
  fullname: yup.string().required("Fullname must be required"),
  email: yup.string().email().required("Email must be required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters :)")
    .max(14)
    .required("Password must be required"),
});

const SignupPage = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // console.log("errors:", errors);
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    // setToggleEye(true);
    const credentail = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    navigate("/");
    await updateProfile(credentail.user, {
      displayName: data.fullname,
    });
    console.log("credentail:", credentail);
    // console.log("auth:", auth);
    const userRef = collection(db, "users");
    await addDoc(userRef, {
      email: data.email,
      password: data.password,
      id: credentail.user.uid,
    });
    toast.success("Register Successfully!");
  };

  useEffect(() => {
    const arrErrorsValidation = Object.values(errors);
    // console.log(arrErrorsValidation);
    if (arrErrorsValidation.length > 0) {
      arrErrorsValidation.forEach((error) => {
        toast.error(error.message, {
          pauseOnHover: false,
          autoClose: 2000,
        });
      });
    }
  }, [errors]);
  return (
    <HeadingAuthentication>
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
          {errors?.fullname && (
            <span className="input-error">{errors?.fullname?.message}</span>
          )}
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
          You already have an account!
          <NavLink to={"/sign-in"}>Login</NavLink>
        </div>
        <Button
          className="btn-center"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          width="300px"
          kind="primary"
        >
          Sign Up
        </Button>
      </form>
    </HeadingAuthentication>
  );
};

export default SignupPage;
