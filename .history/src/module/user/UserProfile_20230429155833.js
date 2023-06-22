import React, { useEffect, useState } from "react";
import ImageUpload from "../../components/image/ImageUpload";
import useFirebaseImage from "../../hook/useFirebaseImage";
import { useForm } from "react-hook-form";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";
import { Navigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input, InputToggleIcon } from "../../components/input";
import Radio from "../../components/checkboxradio/Radio";
import { userRole, userStatus } from "../../utils/constants";
import { Button } from "../../components/button";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useAuth } from "../../contexts/authContext";
import { updatePassword } from "firebase/auth";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  fullname: yup.string().required("Fullname must be required"),
  username: yup.string().required("Username must be required"),
  newpassword: yup
    .string()
    .required("Please enter New Password")
    .min(8, "Password length should be at least 8 characters")
    .max(12, "Password cannot exceed more than 12 characters"),
  confirmpassword: yup
    .string()
    .required("Please enter Confirm Password")
    .oneOf(
      [yup.ref("newpassword")],
      "New password and Confirm Password does not match"
    ),
});

const UserProfile = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      avatar: "",
      status: 1,
      role: 3,
    },
  });
  console.log("errors", errors);
  const { authUser } = useAuth();
  const [params] = useSearchParams();
  const userId = params.get("id");
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const a = getValues("avatar");
  const imageName = /2F(\S+)\?/.exec(a)?.[1];
  const [changePw, setChangePw] = useState(false);

  const {
    imageURL,
    setImageURL,
    progressUpload,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues, imageName, handleDeleteAvatar);

  useEffect(() => {
    async function fetchUserProfile() {
      const user = await getDoc(doc(db, "users", userId));
      // console.log(user.data());
      const data = user.data();
      reset({
        ...data,
      });
      setImageURL(data?.avatar);
    }
    fetchUserProfile();
  }, [reset, setImageURL, userId]);

  async function handleDeleteAvatar() {
    await updateDoc(doc(db, "users", userId), {
      avatar: "",
    });
  }

  const handleUpdateUser = async (data) => {
    // console.log("imageURL", imageURL);
    console.log(data);
    const dataUpdate = {
      avatar: imageURL,
      fullname: data.fullname,
      id: data.id,
      password: data.newpassword,
      username: data.username,
    };
    try {
      await updateDoc(doc(db, "users", userId), {
        ...dataUpdate,
        phonenumber: data?.phonenumber,
        birthday: data?.birthday,
      });
    } catch (error) {
      console.log(error);
    }
    async function fetchPost() {
      try {
        const q = query(
          collection(db, "posts"),
          where("user.id", "==", userId)
        );
        // console.log("q", q);
        const idPostArr = [];
        const docs = await getDocs(q);
        docs.forEach((doc) => {
          idPostArr.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        idPostArr.forEach(async (d) => {
          await updateDoc(doc(db, "posts", d.id), {
            user: dataUpdate,
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchPost();

    try {
      await updatePassword(auth.currentUser, data.newpassword);
      console.log("update pw successfully");
    } catch (error) {
      console.log(error);
    }
    toast.success(`Update user ${data.email} successfully!`, {
      autoClose: 1500,
      pauseOnHover: false,
    });
  };

  return (
    <>
      <DashboardHeading
        title={`Account information`}
        desc={authUser?.fullname}
      ></DashboardHeading>
      <div className="w-full flex items-center justify-center mb-10">
        <div className="w-[180px] h-[180px] ">
          <ImageUpload
            className="w-full h-full !rounded-full "
            imageURL={imageURL}
            progress={progressUpload}
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
        </div>
      </div>
      <form action="" onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="grid-addnew">
          <Field>
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              type="text"
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
              required
            ></Input>
            <span
              className={`input-error transition-all duration-200 ${
                errors?.fullname?.message
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              }`}
            >
              {errors?.fullname?.message}
            </span>
          </Field>
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
            {errors?.username && (
              <span className="input-error">{errors?.username?.message}</span>
            )}
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              name="email"
              placeholder="Enter your email"
              control={control}
              disabled
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="birthday">Date of Birth</Label>
            <Input
              type="text"
              name="birthday"
              placeholder="dd/mm/yyyy"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="phonenumber">Mobile Number</Label>
            <Input
              type="text"
              name="phonenumber"
              placeholder="Enter your phone number"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="status-wrap flex items-center gap-x-10">
              <Radio
                name="status"
                value={userStatus.ACTIVE}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                control={control}
                disabled
              >
                Active
              </Radio>
              <Radio
                name="status"
                value={userStatus.PENDING}
                checked={Number(watchStatus) === userStatus.PENDING}
                control={control}
                disabled
              >
                Pending
              </Radio>
              <Radio
                name="status"
                value={userStatus.BAN}
                checked={Number(watchStatus) === userStatus.BAN}
                control={control}
                disabled
              >
                Banned
              </Radio>
            </div>
          </Field>
          <Field className="justify-center">
            <p
              onClick={() => setChangePw(!changePw)}
              className="text-[#059fa7fa] font-medium cursor-pointer underline"
            >
              Change your password
            </p>
            {changePw && (
              <>
                <Label htmlFor="oldpassword">Old Password</Label>
                <InputToggleIcon
                  control={control}
                  name="oldpassword"
                ></InputToggleIcon>
                <Label htmlFor="newpassword">New Password</Label>
                <InputToggleIcon
                  control={control}
                  name="newpassword"
                ></InputToggleIcon>
                <Label htmlFor="confirmpassword">Confirm Password</Label>
                <InputToggleIcon
                  control={control}
                  placeholder="Please enter your confirm password"
                  name="confirmpassword"
                ></InputToggleIcon>
              </>
            )}
          </Field>
          <Field>
            <Label htmlFor="role">Role</Label>
            <div className="status-wrap flex items-center gap-x-10">
              <Radio
                name="role"
                value={userRole.ADMIN}
                checked={Number(watchRole) === userRole.ADMIN}
                control={control}
                disabled
              >
                Admin
              </Radio>
              <Radio
                name="role"
                value={userRole.MOD}
                checked={Number(watchRole) === userRole.MOD}
                control={control}
                disabled
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                value={userRole.USER}
                checked={Number(watchRole) === userRole.USER}
                control={control}
                disabled
              >
                User
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="btn-center"
          width="200px"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update account
        </Button>
      </form>
    </>
  );
};

export default UserProfile;