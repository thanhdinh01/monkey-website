import React from "react";
import { Label, LabelDashboard } from "../../components/label";
import { Field } from "../../components/field";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import Radio from "../../components/checkboxradio/Radio";
import { categoryStatus } from "../../utils/constants";

const CategoryAddNew = () => {
  const { control, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
    },
  });

  const watchStatus = watch("status");

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
            <div className="status-wrap flex items-center gap-x-10">
              <Radio
                name="status"
                value={categoryStatus.APPROVED}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                control={control}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                value={categoryStatus.UNAPPROVED}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                control={control}
              >
                Approved
              </Radio>
            </div>
          </Field>
        </div>
      </form>
    </div>
  );
};

export default CategoryAddNew;