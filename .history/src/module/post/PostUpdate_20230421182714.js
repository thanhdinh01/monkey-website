import React from "react";
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

const PostUpdate = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const [params] = useSearchParams();
  console.log(params);

  const submitUpdatePost = (data) => {
    console.log(data);
  };
  return (
    <>
      <DashboardHeading
        title="Update post"
        desc="Update post has id:${}"
      ></DashboardHeading>
      <form action="" className="" onSubmit={handleSubmit(submitUpdatePost)}>
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
            {/* <div className="status-wrap flex items-center gap-x-10">
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
            </div> */}
          </Field>
          {/* ---- Category ----- */}
          <Field>
            <Label htmlFor="category">Category</Label>
            <Dropdown>
              <Dropdown.Selected
              // placeholder={selectedCategory || "Please select your category"}
              ></Dropdown.Selected>
              <Dropdown.List>
                {/* {arrCategories.length > 0 &&
                  arrCategories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleSelectOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))} */}
              </Dropdown.List>
            </Dropdown>
          </Field>
          {/* ---- Toggle hot post ----- */}
          <Field>
            <Label htmlFor="hot-feature">Hot Feature</Label>
            {/* <Toggle
              show={watchHotFeature}
              onClick={() => {
                setValue("hotFeature", !watchHotFeature);
              }}
            ></Toggle> */}
          </Field>
          {/* ---- Image ----- */}
          <Field>
            <Label htmlFor="image">Image</Label>
            {/* <ImageUpload
              imageURL={imageURL}
              progress={progressUpload}
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload> */}
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
          Update post
        </Button>
      </form>
    </>
  );
};

export default PostUpdate;
