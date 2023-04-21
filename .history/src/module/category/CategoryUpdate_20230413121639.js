import React, { useEffect, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useSearchParams } from "react-router-dom";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import Radio from "../../components/checkboxradio/Radio";
import { Button } from "../../components/button";
import { useForm } from "react-hook-form";
import { categoryStatus } from "../../utils/constants";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const CategoryUpdate = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
    },
  });
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const watchStatus = watch("status");
  const [thanh, setThanh] = useState();

  useEffect(() => {
    async function fetchInfoCategory() {
      const data = await getDoc(doc(db, "categories", categoryId));
      //   setThanh(data.data());
    }
    fetchInfoCategory();
  }, [categoryId]);
  console.log(thanh);

  const handleUpdateCategory = (values) => {
    console.log(values);
  };

  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id: ${categoryId}`}
      ></DashboardHeading>
      <form action="" onSubmit={handleSubmit(handleUpdateCategory)}>
        <div className="grid-addnew">
          <input
            type="text"
            value={thanh}
            onChange={(e) => setThanh(e.target.value)}
          />
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
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
