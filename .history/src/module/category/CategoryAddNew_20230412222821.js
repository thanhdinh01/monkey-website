import React from "react";
import { Label, LabelDashboard } from "../../components/label";
import { Field } from "../../components/field";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";

const CategoryAddNew = () => {
  const { control } = useForm({
    mode: "onChange",
  });

  return (
    <div>
      <LabelDashboard
        title="New category"
        desc="Add new category"
      ></LabelDashboard>
      <form action="">
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
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              name="title"
              placeholder="Enter your title"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="status">Status</Label>
            <div className="status-wrap flex items-center gap-x-10"></div>
          </Field>
        </div>
      </form>
    </div>
  );
};

export default CategoryAddNew;
