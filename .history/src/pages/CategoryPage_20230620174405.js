import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import DashboardHeading from "../module/dashboard/DashboardHeading";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import PostRelatedItem from "../module/post/PostRelatedItem";

const CategoryPageStyled = styled.div`
  margin-top: 60px;
  padding-bottom: 60px;
  .grid-related {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }
`;

const CategoryPage = () => {
  const [listItem, setListItem] = useState([]);
  const [currentCate, setCurrentCate] = useState();
  const { category } = useParams();
  console.log("category", category);

  useEffect(() => {
    async function fetchPosts() {
      const q = query(
        collection(db, "categories"),
        where("slug", "==", category)
      );

      const listCategory = await getDocs(q);
      // listCategory.forEach((d) =>
      //   setCurrentCate({
      //     id: d.id,
      //     ...d.data(),
      //   })
      // );
      // if (currentCate) {
      //   const qPost = query(
      //     collection(db, "posts"),
      //     where("category.id", "==", currentCate?.id)
      //   );
      //   const listPosts = await getDocs(qPost);
      //   const results = [];
      //   listPosts.forEach((item) =>
      //     results.push({
      //       id: item.id,
      //       ...item.data(),
      //     })
      //   );
      //   setListItem(results);
      // }
    }
    fetchPosts();
  }, [category, currentCate]);
  console.log("list:", listItem);

  if (!listItem) return null;
  return (
    <Layout>
      <CategoryPageStyled>
        <div className="container">
          <DashboardHeading
            title={`Category page of " ${
              currentCate?.name !== undefined ? currentCate?.name : ""
            } "`}
          ></DashboardHeading>
          <div className="grid-related">
            {listItem.length > 0 &&
              listItem.map((post) => (
                <PostRelatedItem key={post?.id} data={post}></PostRelatedItem>
              ))}
          </div>
        </div>
      </CategoryPageStyled>
    </Layout>
  );
};

export default CategoryPage;
