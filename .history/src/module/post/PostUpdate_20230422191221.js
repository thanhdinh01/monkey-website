import React, { useEffect, useMemo, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useSearchParams } from "react-router-dom";
import { Field } from "../../components/field";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import { useForm } from "react-hook-form";
import Radio from "../../components/checkboxradio/Radio";
import { postStatus } from "../../utils/constants";
import { Dropdown } from "../../components/dropdown";
import Toggle from "../../components/toggle/Toggle";
import ImageUpload from "../../components/image/ImageUpload";
import { Button } from "../../components/button";
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
import useFirebaseImage from "../../hook/useFirebaseImage";
import slugify from "slugify";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
Quill.register("modules/imageUploader", ImageUploader);

const PostUpdate = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
    setValue,
    getValues,
    reset,
  } = useForm({
    mode: "onChange",
  });
  const [params] = useSearchParams();
  const postId = params.get("id");
  const watchStatus = watch("status");
  const watchHotFeature = watch("hotFeature");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [arrCategories, setArrCategories] = useState([]);
  const [valueContent, setValueContent] = useState("");

  const {
    imageURL,
    setImageURL,
    progressUpload,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);

  // custom for rich text editor
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          //   const form = new FormData();
          //   const thanh = form.append("image", file);

          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("image", file);
            console.log("thanh", formData.append("image", file));

            fetch(
              "https://api.imgbb.com/1/upload?key=e7031b2bafe2c402e972ec9453576f16",
              {
                method: "POST",
                body: formData,
              }
            )
              .then((response) => response.json())
              .then((result) => {
                console.log(result);
                resolve(result.data.url);
              })
              .catch((error) => {
                reject("Upload failed");
                console.error("Error:", error);
              });
          });
        },
      },
    }),
    []
  );

  useEffect(() => {
    async function fetchPost() {
      const post = await getDoc(doc(db, "posts", postId));
      // console.log("data", post.data());
      reset({
        ...post.data(),
      });
      setSelectedCategory(post.data().category.name);
      setImageURL(post.data().imageURL);
    }
    fetchPost();
  }, [postId, reset, setImageURL]);

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

  const handleSelectOption = (item) => {
    setSelectedCategory(item.name);
    setValue("category", {
      ...item,
    });
  };

  const submitUpdatePost = async (data) => {
    data.status = Number(data.status);
    data.slug = slugify(data.slug || data.title, { lower: true });
    console.log(data);
    await updateDoc(doc(db, "posts", postId), {
      content: valueContent,
    });
  };

  if (!postId) return null;
  return (
    <>
      <DashboardHeading
        title="Update post"
        desc={`Update post content has id: ${postId}`}
      ></DashboardHeading>
      <form action="" className="" onSubmit={handleSubmit(submitUpdatePost)}>
        <div className="grid-addnew">
          {/*---- Title ----- */}
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
          Update post
        </Button>
      </form>
    </>
  );
};

export default PostUpdate;
