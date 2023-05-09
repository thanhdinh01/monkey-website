import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import Radio from "../../components/checkboxradio/Radio";
import { Dropdown } from "../../components/dropdown";
import slugify from "slugify";
import { postStatus } from "../../utils/constants";

import ImageUpload from "../../components/image/ImageUpload";
import useFirebaseImage from "../../hook/useFirebaseImage";
import Toggle from "../../components/toggle/Toggle";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useAuth } from "../../contexts/authContext";
import { toast } from "react-toastify";
import DashboardHeading from "../dashboard/DashboardHeading";

const PostAddNewStyled = styled.div``;

const PostAddNew = () => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      category: {},
      user: {},
      hotFeature: false,
      image_name: "",
      imageURL:
        "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80",
    },
  });

  const {
    imageURL,
    setImageURL,
    progressUpload,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);
  const { authUser } = useAuth();

  const watchStatus = watch("status"); // watch specified input with defaulValues:/value of useForm (with no so undefined), use this 'watch' method to set defaulvalue radio when component mounted
  const watchHotFeature = watch("hotFeature");
  const [arrCategories, setArrCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [reworkFetchUser, setReworkFetchUser] = useState(1);

  // GET request categories list to display
  useEffect(() => {
    async function queryCategories() {
      const q = query(collection(db, "categories"), where("status", "==", 1));
      let arrCategories = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arrCategories.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setArrCategories(arrCategories);
    }
    queryCategories();
  }, []);
  // setValue -user-
  useEffect(() => {
    console.log("user");
    if (!reworkFetchUser) return;
    if (!authUser.uid) return;
    async function fetchUser() {
      const user = await getDoc(doc(db, "users", authUser.uid));
      setValue("user", {
        ...user.data(),
      });
    }
    fetchUser();
  }, [authUser, reworkFetchUser, setValue]);

  useEffect(() => {
    document.title = "Monkey Add New Post";
  }, []);
  // change selected dropdown and setValue -category-
  const handleSelectOption = (item) => {
    setSelectedCategory(item.name);
    setValue("category", {
      ...item,
    });
  };

  const submitAddnew = async (data) => {
    console.log("data", data);
    const cloneData = { ...data };
    cloneData.slug = slugify(data.slug || data.title, { lower: true });
    cloneData.status = Number(data.status);
    await addDoc(collection(db, "posts"), {
      ...cloneData,
      createAt: serverTimestamp(),
    });
    setReworkFetchUser(Math.random());
    toast.success("Add new post successfully!", {
      pauseOnHover: false,
      autoClose: 1500,
    });
    reset({
      title: "",
      slug: "",
      status: 2,
      category: {},
      user: {},
      hotFeature: false,
      image_name: "",
      imageURL: "",
    });
    setImageURL("");
    setSelectedCategory("");
    console.log(cloneData);
  };

  return (
    <PostAddNewStyled>
      <DashboardHeading
        title="Add new post"
        desc="Add new post"
      ></DashboardHeading>
      <form action="" className="" onSubmit={handleSubmit(submitAddnew)}>
        <div className="grid-addnew">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Enter your title"
              control={control}
            ></Input>
          </Field>
          {/*---- Slug ----- */}
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              type="text"
              name="slug"
              placeholder="Enter your slug"
              control={control}
            ></Input>
          </Field>

          {/* ---- Status ----- */}
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="status-wrap flex items-center gap-x-10">
              <Radio
                value={postStatus.APPROVED}
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                value={postStatus.PENDING}
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                value={postStatus.REJECT}
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECT}
              >
                Reject
              </Radio>
            </div>
          </Field>
          {/* ---- Category ----- */}
          <Field>
            <Label htmlFor="category">Category</Label>
            <Dropdown>
              <Dropdown.Selected
                placeholder={selectedCategory || "Please select your category"}
              ></Dropdown.Selected>
              <Dropdown.List>
                {arrCategories.length > 0 &&
                  arrCategories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleSelectOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          </Field>
          {/* ---- Toggle hot post ----- */}
          <Field>
            <Label htmlFor="hot-feature">Hot Feature</Label>
            <Toggle
              show={watchHotFeature}
              onClick={() => {
                setValue("hotFeature", !watchHotFeature);
              }}
            ></Toggle>
          </Field>
          {/* ---- Image ----- */}
          <Field>
            <Label htmlFor="image">Image</Label>
            <ImageUpload
              imageURL={imageURL}
              progress={progressUpload}
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>
        </div>
        <Button
          className="btn-center"
          type="submit"
          kind="primary"
          width="175px"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new post
        </Button>
      </form>
    </PostAddNewStyled>
  );
};

export default PostAddNew;
