import React from "react";
import { Label, LabelDashboard } from "../../components/label";
import { Field } from "../../components/field";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import Radio from "../../components/checkboxradio/Radio";
import { categoryStatus } from "../../utils/constants";
import { Button } from "../../components/button";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import slugify from "slugify";
import { toast } from "react-toastify";

const CategoryAddNew = () => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
    },
  });

  const watchStatus = watch("status");

  const handleAddNewCategory = async (values) => {
    console.log(values);
    try {
      await addDoc(collection(db, "categories"), {
        name: values.name,
        slug: slugify(values.slug || values.name, { lower: true }),
        status: Number(values.status),
        createAt: serverTimestamp(),
      });
      toast.success("Create new category successfully!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
      });
    }
  };

  return (
    <div>
      <LabelDashboard
        title="New category"
        desc="Add new category"
      ></LabelDashboard>
      <form action="" onSubmit={handleSubmit(handleAddNewCategory)}>
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

export default CategoryAddNew;
