import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import DashboardHeading from "../dashboard/DashboardHeading";
import ImageUpload from "../../components/image/ImageUpload";
import useFirebaseImage from "../../hook/useFirebaseImage";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input, InputToggleIcon } from "../../components/input";
import Radio from "../../components/checkboxradio/Radio";
import { userRole, userStatus } from "../../utils/constants";
import { Button } from "../../components/button";
import { useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const UserUpdate = () => {
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
      avatar:
        "https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1101&q=80",
      status: 1,
      role: 3,
    },
  });

  const watchStatus = watch("status");
  const watchRole = watch("role");
  const [params] = useSearchParams();
  const userId = params.get("id");
  const image = getValues("avatar");
  console.log("image", image);
  const imageRegex = /%2F(\S+)\?/gm.exec(image);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const {
    imageURL,
    setImageURL,
    progressUpload,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues, imageName);

  useEffect(() => {
    async function fetchInfoUser() {
      const data = await getDoc(doc(db, "users", userId));
      console.log(data.data());

      reset({
        avatar: setImageURL(data.data().avatar),
        fullname: data.data().fullname,
        username: data.data().username,
        email: data.data().email,
        password: data.data().password,
        status: data.data().status,
        role: data.data().role,
      });
    }
    fetchInfoUser();
  }, [reset, userId, setImageURL, setValue]);

  const handleUpdateUser = (data) => {
    console.log("imageURL", imageURL);
    console.log(data);
  };

  return (
    <div>
      <DashboardHeading
        title="Update User"
        desc={`Update user has id: ${userId}`}
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
          Update user
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
