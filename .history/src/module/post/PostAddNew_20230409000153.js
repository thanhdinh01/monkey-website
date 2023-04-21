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

  const submitAddnew = (data) => {
    data.slug = data.slug || slugify(data.title);
    data.status = Number(data.status);
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
          {/* Slug */}
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              type="text"
              name="slug"
              placeholder="Enter your slug"
              control={control}
            ></Input>
          </Field>
          {/* Image */}
          <Field>
            <Label htmlFor="author">Image</Label>
            <input type="file" />
          </Field>

          {/* Status */}
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
