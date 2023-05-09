import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
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
import { db } from "../../firebase/firebase-config";
import { Navigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input, InputToggleIcon } from "../../components/input";
import Radio from "../../components/checkboxradio/Radio";
import { userRole, userStatus } from "../../utils/constants";
import { Button } from "../../components/button";
import DashboardHeading from "../dashboard/DashboardHeading";

const UserProfile = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    getValues,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
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

  const [params] = useSearchParams();
  const userId = params.get("id");
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const {
    imageURL,
    setImageURL,
    progressUpload,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);

  useEffect(() => {
    async function fetchUserProfile() {
      const user = await getDoc(doc(db, "users", userId));
      console.log(user.data());
      const data = user.data();
      reset({
        ...data,
      });
      setImageURL(data?.avatar);
    }
    fetchUserProfile();
  }, [reset, setImageURL, userId]);

  const handleUpdateUser = async (data) => {
    // console.log("imageURL", imageURL);
    // console.log(data);
    const dataUpdate = {
      avatar: imageURL,
      createAt: data.createAt,
      email: data.email,
      fullname: data.fullname,
      id: data.id,
      password: data.password,
      role: Number(data.role),
      status: Number(data.status),
      username: data.username,
    };
    await updateDoc(doc(db, "users", userId), {
      ...dataUpdate,
    });
    async function fetchPost() {
      const q = query(collection(db, "posts"), where("user.id", "==", userId));
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
    }
    fetchPost();
    toast.success(`Update user ${data.email} successfully!`, {
      autoClose: 1500,
      pauseOnHover: false,
    });
  };

  return (
    <>
      <DashboardHeading title="Account information"></DashboardHeading>
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
          </Field>
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              name="email"
              placeholder="Enter your email"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="birthdat">Date of Birth</Label>
            <Input
              type="text"
              name="birthdat"
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
            <Label htmlFor="newpassword">New Password</Label>
            <InputToggleIcon
              control={control}
              name="newpassword"
            ></InputToggleIcon>
          </Field>
          <Field>
            <Label htmlFor="confirmpassword">Confirm Password</Label>
            <InputToggleIcon
              control={control}
              placeholder="Please enter your confirm password"
              name="confirmpassword"
            ></InputToggleIcon>
          </Field>
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="status-wrap flex items-center gap-x-10">
              <Radio
                name="status"
                value={userStatus.ACTIVE}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                control={control}
              >
                Active
              </Radio>
              <Radio
                name="status"
                value={userStatus.PENDING}
                checked={Number(watchStatus) === userStatus.PENDING}
                control={control}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                value={userStatus.BAN}
                checked={Number(watchStatus) === userStatus.BAN}
                control={control}
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
              >
                Admin
              </Radio>
              <Radio
                name="role"
                value={userRole.MOD}
                checked={Number(watchRole) === userRole.MOD}
                control={control}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                value={userRole.USER}
                checked={Number(watchRole) === userRole.USER}
                control={control}
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
          width="180px"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update user
        </Button>
      </form>
    </>
  );
};

export default UserProfile;
