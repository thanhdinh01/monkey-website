import React from "react";
import Layout from "../components/layout/Layout";
import Heading from "../components/layout/Heading";
import styled from "styled-components";

const CategoryPageStyled = styled.div``;

const CategoryPage = () => {
  return (
    <Layout>
      <CategoryPageStyled>
        <div className="container">
          <Heading>Category page of " Du lịch "</Heading>
          <div className="grid-layout">CategoryPage</div>
        </div>
      </CategoryPageStyled>
    </Layout>
  );
};

export default CategoryPage;
