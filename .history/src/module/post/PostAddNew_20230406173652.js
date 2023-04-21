import React from "react";
import styled from "styled-components";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";

const PostAddNewStyled = styled.div``;

const PostAddNew = () => {
  const { control } = useForm({});

  return (
    <PostAddNewStyled>
      <h1 className="dashboard-heading">Add new post</h1>
      <form action="" className="grid-addnew">
        <Field>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Enter your title"
          ></Input>
        </Field>
      </form>
    </PostAddNewStyled>
  );
};

export default PostAddNew;
