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
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter your name category"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              type="text"
              name="slug"
              placeholder="Enter your slug category"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="status">Status category</Label>
            <div className="status-wrap flex items-center gap-x-10"></div>
          </Field>
        </div>
      </form>
    </div>
  );
};

export default CategoryAddNew;
