import React from "react";
import styled from "styled-components";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import Radio from "../../components/checkboxradio/Radio";
import Dropdown from "../../components/dropdown/Dropdown";

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
      status: "pending",
    },
  });

  const watchStatus = watch("status"); // watch specified input with defaulValues: of useForm (with no so undefined), use this 'watch' method to set defaulvalue radio when component mounted

  console.log("watch:", watchStatus);

  const submitAddnew = (data) => {
    console.log(data);
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
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              type="text"
              name="slug"
              placeholder="Enter your slug"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="status-wrap flex items-center gap-x-10">
              <Radio
                value="approved"
                name="status"
                control={control}
                checked={watchStatus === "approved"}
              >
                Approved
              </Radio>
              <Radio
                value="pending"
                name="status"
                control={control}
                checked={watchStatus === "pending"}
              >
                Pending
              </Radio>
              <Radio
                value="reject"
                name="status"
                control={control}
                checked={watchStatus === "reject"}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label htmlFor="author">Author</Label>
            <Input
              type="text"
              name="author"
              placeholder="Enter your author"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="category">Category</Label>
            <Dropdown></Dropdown>
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
