import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useForm } from "react-hook-form";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import Radio from "../../components/checkboxradio/Radio";
import { categoryStatus } from "../../utils/constants";
import { Button } from "../../components/button";

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const handleAddNewUser = (data) => {
    console.log(data);
  };

  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form action="" onSubmit={handleSubmit(handleAddNewUser)}>
        <div className="grid-addnew">
          <Field>
            <Label htmlFor="name">Name Category</Label>
            <Input
              type="text"
              name="name"
              placeholder="Enter your name category"
              control={control}
              required
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug Category</Label>
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
                // checked={Number(watchStatus) === categoryStatus.APPROVED}
                // control={control}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                value={categoryStatus.UNAPPROVED}
                // checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                // control={control}
              >
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="btn-center"
          width="220px"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
