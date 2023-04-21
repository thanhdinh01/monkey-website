import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useForm } from "react-hook-form";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input, InputToggleIcon } from "../../components/input";
import Radio from "../../components/checkboxradio/Radio";
import { userRole, userStatus } from "../../utils/constants";
import { Button } from "../../components/button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/firebase-config";
import PostImage from "../post/component/PostImage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import slugify from "slugify";
import { toast } from "react-toastify";
import useFirebaseImage from "../../hook/useFirebaseImage";
import ImageUpload from "../../components/image/ImageUpload";

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      avatar:
        "https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1101&q=80",
      status: 1,
      role: 3,
    },
  });

  const watchStatus = watch("status");
  const watchRole = watch("role");
  const {
    imageURL,
    setImageURL,
    progressUpload,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);

  const fileName = getValues("avatar");
  console.log("fileName", fileName);

  const handleAddNewUser = async (data) => {
    console.log(data);

    // const credential = await createUserWithEmailAndPassword(
    //   auth,
    //   data.email,
    //   data.password
    // );

    // await updateProfile(credential.user, {
    //   displayName: slugify(data.username || data.fullname, {
    //     lower: true,
    //     replacement: " ",
    //     trim: true,
    //   }),
    // });
    // await addDoc(collection(db, "users"), {
    //   fullname: data.fullname,
    //   username: slugify(data.username || data.fullname, {
    //     lower: true,
    //     replacement: " ",
    //     trim: true,
    //   }),
    //   email: data.email,
    //   password: data.password,
    //   avatar: imageURL,
    //   status: Number(data.status),
    //   role: Number(data.role),
    //   createAt: serverTimestamp(),
    // });
    // setImageURL("");
    // reset({
    //   fullname: "",
    //   username: "",
    //   email: "",
    //   password: "",
    //   avatar: "",
    //   id: credential.user.uid,
    //   status: 1,
    //   role: 3,
    //   createAt: new Date(),
    // });
    toast.success(
      `created ${data.email} successfully! and you are already logged in with this account`,
      {
        pauseOnHover: false,
        autoClose: 1500,
      }
    );
  };

  return (
    <div>
      <DashboardHeading
        title="New User"
        desc="Add new user to system with your admin permission"
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
        {/* <PostImage
          width="180px"
          height="180px"
          radius="100%"
          src="https://images.unsplash.com/photo-1587140915865-98ca1a430267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        ></PostImage> */}
      </div>
      <form action="" onSubmit={handleSubmit(handleAddNewUser)}>
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
            <Label htmlFor="password">Password</Label>
            <InputToggleIcon control={control}></InputToggleIcon>
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
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
