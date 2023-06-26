import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import Radio from "../../components/checkboxradio/Radio";
import { Dropdown } from "../../components/dropdown";
import slugify from "slugify";
import { postStatus, userRole } from "../../utils/constants";

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
import ReactQuill from "react-quill";
import axios from "axios";
import { useSelector } from "react-redux";

const PostAddNewStyled = styled.div`
  .quill .ql-container.ql-snow {
    color: ${(props) => props.theme.textInput};
  }
`;

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
        "https://images.unsplash.com/photo-1622542796254-5b9c46ab0d2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
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
  const [valueContent, setValueContent] = useState("");
  const { user } = useSelector((state) => state.global);
  const isAdmin = user?.role === userRole.ADMIN;

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

  // custom for rich text editor
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        [("link", "image")],
      ],
      imageUploader: {
        upload: async (file) => {
          try {
            const formData = new FormData();
            formData.append("image", file);
            const res = await axios({
              method: "post",
              url: "https://api.imgbb.com/1/upload?key=e7031b2bafe2c402e972ec9453576f16",
              data: formData,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            return res.data.data.url;
          } catch (error) {
            console.log(error);
          }
        },
      },
    }),
    []
  );

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

      content: valueContent,
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
      content: "",
    });
    setImageURL("");
    setSelectedCategory("");
    setValueContent("");
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
                disabled={!isAdmin}
              >
                Approved
              </Radio>
              <Radio
                value={postStatus.PENDING}
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                disabled={!isAdmin}
              >
                Pending
              </Radio>
              <Radio
                value={postStatus.REJECT}
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECT}
                disabled={!isAdmin}
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
                if (isAdmin) {
                  setValue("hotFeature", !watchHotFeature);
                }
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
        {/* ---- Content ----- */}
        <Field>
          <Label htmlFor="content">Content</Label>
          <div className="w-full entry-content">
            <ReactQuill
              modules={modules}
              theme="snow"
              value={valueContent}
              onChange={setValueContent}
            />
          </div>
        </Field>
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
