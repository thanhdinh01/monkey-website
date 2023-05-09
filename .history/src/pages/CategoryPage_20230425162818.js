import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import DashboardHeading from "../module/dashboard/DashboardHeading";
import { useParams } from "react-router-dom";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const CategoryPageStyled = styled.div`
  margin-top: 60px;
`;

const CategoryPage = () => {
  const [listItem, setListItem] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    async function fetchPosts() {
      const q = query(
        collection(db, "categories"),
        where("slug", "==", category)
      );

      const listCategory = await getDocs(q);
      let categoryId = "";
      listCategory.forEach((d) => (categoryId = d.id));
      const qPost = query(
        collection(db, "posts"),
        where("category.id", "==", categoryId)
      );
      const listPosts = await getDocs(qPost);
      const results = [];
      listPosts.forEach((item) =>
        results.push({
          id: item.id,
          ...item.data(),
        })
      );
      setListItem(results);
    }
    fetchPosts();
  }, [category]);
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
