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
import { useSearchParams } from "react-router-dom";
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
import styled from "styled-components";
import { useSelector } from "react-redux";

const UserProfileStyled = styled.div`
  @media screen and (max-width: 1024px) {
    display: flex !important;
    flex-direction: column;
    gap: 20px;
    form {
      margin-top: 0 !important;
    }
  }
  .grid-addnew {
    @media screen and (max-width: 376px) {
      .status-wrap {
        column-gap: 24px;
      }
    }
  }
`;

const UserProfile = () => {
  const [currentPw, setCurrentPw] = useState("");

  const schema = yup.object().shape({
    fullname: yup.string().required("Fullname must be required"),
    username: yup.string().required("Username must be required"),
    oldpassword: yup
      .string()
      .oneOf(
        [currentPw],
        "Your old password is invalid, please enter again to confirm!"
      ),
    newpassword: yup
      .string()
      .min(8, "Password length should be at least 8 characters")
      .max(16, "Password cannot exceed more than 16 characters"),
    confirmpassword: yup
      .string()
      .oneOf(
        [yup.ref("newpassword")],
        "New password and Confirm Password does not match"
      ),
  });
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const [changePw, setChangePw] = useState(false);
  const [oldData, setOldData] = useState({});
  const [imageName, setImageName] = useState({});
  const { authUser } = useAuth();
  const { user } = useSelector((state) => state.global);
  const [params] = useSearchParams();
  const userId = params.get("id");
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const a = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(a);
  const imageName1 = imageRegex?.length > 0 ? imageRegex[1] : "";
  console.log("imgName", imageName1);

  useEffect(() => {
    const a = getValues("avatar");
    const imageRegex = /%2F(\S+)\?/gm.exec(a);
    const imageName1 = imageRegex?.length > 0 ? imageRegex[1] : "";
    console.log("useEffect", imageRegex);
  }, [getValues]);

  const {
    imageURL,
    setImageURL,
    progressUpload,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues, imageName1, handleDeleteAvatar);

  // GET request to display data of profile
  useEffect(() => {
    async function fetchUserProfile() {
      const user = await getDoc(doc(db, "users", userId));
      const data = user.data();
      setOldData({ ...data });
      setCurrentPw(data.password);
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

  // handle update data account
  const handleUpdateUser = async (data) => {
    if (!isValid) return null;
    const dataUpdate = {
      ...oldData,
      avatar: imageURL,
      fullname: data.fullname,
      id: oldData.id,
      password: data.newpassword || data.password,
      username: data.username,
    };
    try {
      await updateDoc(doc(db, "users", userId), {
        ...dataUpdate,
        phonenumber: data?.phonenumber,
        birthday: data?.birthday,
      });
      toast.success(`Update user ${data.email} successfully!`, {
        autoClose: 1500,
        pauseOnHover: false,
      });
    } catch (error) {
      console.log(error);
      return;
    }
    try {
      await updatePassword(auth.currentUser, data.newpassword);
      setCurrentPw(data.newpassword || data.password);
    } catch (error) {
      console.log(error);
      return;
    }
    reset({ ...oldData });
    async function fetchPost() {
      try {
        const q = query(
          collection(db, "posts"),
          where("user.id", "==", userId)
        );
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
        return;
      }
    }
    fetchPost();
  };

  return (
    <UserProfileStyled>
      <DashboardHeading
        title={`Account information`}
        desc={authUser?.fullname}
      ></DashboardHeading>
      <div className="w-full flex items-center justify-center mb-10 avt-profile">
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
              className={`input-error transition-all duration-[250ms] ${
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
            <span
              className={`input-error transition-all duration-[250ms] ${
                errors?.username?.message
                  ? "visible opacity-100"
                  : "invisible opacity-0"
              }`}
            >
              {errors?.username?.message}
            </span>
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
                <span
                  className={`input-error transition-all duration-[250ms] ${
                    errors?.oldpassword?.message
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                  }`}
                >
                  {errors?.oldpassword?.message}
                </span>
                <Label htmlFor="newpassword">New Password</Label>
                <InputToggleIcon
                  control={control}
                  name="newpassword"
                ></InputToggleIcon>
                <span
                  className={`input-error transition-all duration-[250ms] ${
                    errors?.newpassword?.message
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                  }`}
                >
                  {errors?.newpassword?.message}
                </span>
                <Label htmlFor="confirmpassword">Confirm Password</Label>
                <InputToggleIcon
                  control={control}
                  placeholder="Please enter your confirm password"
                  name="confirmpassword"
                ></InputToggleIcon>
                <span
                  className={`input-error transition-all duration-[250ms] ${
                    errors?.confirmpassword?.message
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                  }`}
                >
                  {errors?.confirmpassword?.message}
                </span>
              </>
            )}
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
    </UserProfileStyled>
  );
};

export default UserProfile;
