import React, { useEffect, useState } from "react";
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
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { toast } from "react-toastify";

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
      avatar: "",
      status: 1,
      role: 3,
    },
  });

  const [postArr, setPostArr] = useState([]);
  const navigate = useNavigate();
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const [params] = useSearchParams();
  const userId = params.get("id");
  const image = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(image);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  // console.log("imageName", imageName);
  const {
    imageURL,
    setImageURL,
    progressUpload,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues, imageName, handleDeleteAvatar);

  // console.log("imageURL", imageURL);
  useEffect(() => {
    async function fetchInfoUser() {
      const data = await getDoc(doc(db, "users", userId));
      console.log(data.data());

      reset({ ...data.data() });
    }
    fetchInfoUser();
  }, [reset, userId]);

  useEffect(() => {
    setImageURL(image);
  }, [image, setImageURL]);

  // useEffect for post list
  useEffect(() => {
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
      setPostArr(idPostArr);
      console.log(postArr);
    }
    fetchPost();
  }, [postArr, userId]);

  // reset 'avatar' when first deleting time of update page
  async function handleDeleteAvatar() {
    await updateDoc(doc(db, "users", userId), {
      avatar: "",
    });
  }

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
    // await updateDoc(doc(db, "posts", "0I5XiNOHpalQWgE477ES"), {
    //   hotFeature: false,
    // });
    // await updateDoc(q, {
    //   ...dataUpdate,
    // });
    // const thanh = await getDocs(q);
    // thanh.forEach((t) => {
    //   console.log("t", t.data());
    // });
    toast.success(`Update user ${data.email} successfully!`, {
      autoClose: 1500,
      pauseOnHover: false,
    });
    // navigate("/manage/user");
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
