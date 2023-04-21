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
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const PostAddNewStyled = styled.div`
  .grid-addnew {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 40px;
  }
`;

const PostAddNew = () => {
  const { control, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      author: "",
      categoryId: "",
      hotFeature: false,
      image_name: "",
      imageURL: "",
    },
  });

  const { imageURL, progressUpload, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues);

  const watchStatus = watch("status"); // watch specified input with defaulValues:/value of useForm (with no so undefined), use this 'watch' method to set defaulvalue radio when component mounted
  const watchHotFeature = watch("hotFeature");
  const [selectCategory, setSelectCategory] = useState([]);

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
      setSelectCategory(arrCategories);
      console.log("selectCategory", selectCategory);
    }
    queryCategories();
  }, []);

  const submitAddnew = (data) => {
    const cloneData = { ...data };
    cloneData.slug = slugify(data.slug || data.title);
    cloneData.status = Number(data.status);
    console.log(cloneData);
  };

  return (
    <PostAddNewStyled>
      <h1 className="dashboard-heading">Add new post</h1>
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
          {/* ---- Author ----- */}
          <Field>
            <Label htmlFor="author">Author</Label>
            <Input
              type="text"
              name="author"
              placeholder="Enter your author"
              control={control}
            ></Input>
          </Field>
          {/* ---- Category ----- */}
          <Field>
            <Label htmlFor="category">Category</Label>
            <Dropdown>
              <Dropdown.Selected placeholder="Please select your category"></Dropdown.Selected>
              <Dropdown.List>
                <Dropdown.Option>Knowledge</Dropdown.Option>
                <Dropdown.Option>Blockchain</Dropdown.Option>
                <Dropdown.Option>Setup</Dropdown.Option>
                <Dropdown.Option>Nature</Dropdown.Option>
                <Dropdown.Option>Developer</Dropdown.Option>
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
        <Button className="btn-center" type="submit" kind="primary">
          Add new post
        </Button>
      </form>
    </PostAddNewStyled>
  );
};

export default PostAddNew;
