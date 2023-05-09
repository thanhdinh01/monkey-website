import React from "react";
import Layout from "../components/layout/Layout";
import Heading from "../components/layout/Heading";
import styled from "styled-components";
import DashboardHeading from "../module/dashboard/DashboardHeading";

const CategoryPageStyled = styled.div`
  margin-top: 60px;
`;

const CategoryPage = () => {
  return (
    <Layout>
      <CategoryPageStyled>
        <div className="container">
          <DashboardHeading
            title={`Category page of " Du lịch "`}
          ></DashboardHeading>
          <div className="grid-layout">CategoryPage</div>
        </div>
      </CategoryPageStyled>
    </Layout>
  );
};

export default CategoryPage;
