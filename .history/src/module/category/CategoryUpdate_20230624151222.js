import React, { useEffect } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Field } from "../../components/field";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import Radio from "../../components/checkboxradio/Radio";
import { Button } from "../../components/button";
import { useForm } from "react-hook-form";
import { categoryStatus } from "../../utils/constants";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import slugify from "slugify";
import { toast } from "react-toastify";
import styled from "styled-components";

const CategoryUpdateStyled = styled.div`
  @media screen and (max-width: 1024px) {
    display: flex !important;
    flex-direction: column;
  }
`;

const CategoryUpdate = () => {
  const {
    control,
    handleSubmit,
    watch,
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

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  const watchStatus = watch("status");

  useEffect(() => {
    async function fetchInfoCategory() {
      const data = await getDoc(doc(db, "categories", categoryId));
      reset({
        name: data.data().name,
        slug: data.data().slug,
        status: data.data().status,
      });
    }
    fetchInfoCategory();
  }, [categoryId, reset]);

  const handleUpdateCategory = async (values) => {
    console.log(values);
    await updateDoc(doc(db, "categories", categoryId), {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: Number(values.status),
    });
    toast.success(`Update category has id: ${categoryId} successfully!`);
    navigate("/manage/category");
  };

  return (
    <CategoryUpdateStyled>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id: ${categoryId}`}
      ></DashboardHeading>
      <form action="" onSubmit={handleSubmit(handleUpdateCategory)}>
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
          Update category
        </Button>
      </form>
    </CategoryUpdateStyled>
  );
};

export default CategoryUpdate;
