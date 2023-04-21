import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { useSearchParams } from "react-router-dom";

const CategoryUpdate = () => {
  const [params] = useSearchParams();

  console.log("params", params.get("id"));

  return (
    <div>
      <DashboardHeading
        title="Update category"
        // desc={`Update your category id: ${categoryId}`}
      ></DashboardHeading>
    </div>
  );
};

export default CategoryUpdate;
