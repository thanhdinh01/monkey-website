import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Field } from "../components/field";
import { Input } from "../components/input";
import { Label } from "../components/label";
import HeadingAuthentication from "./HeadingAuthentication";

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
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    rosolver: yupResolver(schema),
  });

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
          {errors?.password && (
            <span className="input-error">{errors?.password?.message}</span>
          )}
        </Field>
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Sign Up
        </Button>
      </form>
    </HeadingAuthentication>
  );
};

export default SignInPage;
