import React from "react";
import styled from "styled-components";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import Radio from "../../components/checkboxradio/Radio";
import { Dropdown, OptionDropdown } from "../../components/dropdown";
import slugify from "slugify";
import { postStatus } from "../../utils/constants";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import ImageUpload from "../../components/image/ImageUpload";

const PostAddNewStyled = styled.div`
  .grid-addnew {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 40px;
  }
`;

const PostAddNew = () => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      status: 2,
    },
  });

  const watchStatus = watch("status"); // watch specified input with defaulValues: of useForm (with no so undefined), use this 'watch' method to set defaulvalue radio when component mounted

  const handleSelectImage = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    if (!file) return;
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("image default");
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            console.log("image default");
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

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
          {/* ---- Image ----- */}
          <Field>
            <Label htmlFor="image">Image</Label>
            <input type="file" onChange={handleSelectImage} />
            <img
              src="../../../public/images/img-upload.png"
              alt=""
              className="w-full h-full"
            />
            <ImageUpload></ImageUpload>
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
              <OptionDropdown>Knowledge</OptionDropdown>
              <OptionDropdown>Blockchain</OptionDropdown>
              <OptionDropdown>Setup</OptionDropdown>
              <OptionDropdown>Nature</OptionDropdown>
              <OptionDropdown>Developer</OptionDropdown>
            </Dropdown>
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
