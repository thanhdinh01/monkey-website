import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import DashboardHeading from "../module/dashboard/DashboardHeading";
import PostRelatedItem from "../module/post/PostRelatedItem";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import slugify from "slugify";

const AuthorPageStyled = styled.div`
  margin-top: 60px;
  margin-bottom: 60px;
  .grid-related {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }
`;

const AuthorPage = () => {
  const [listItem, setListItem] = useState([]);
  const [currentAuthor, setCurrentAuthor] = useState();
  const { author } = useParams();
  author.replace(/-/gm, " ");
  console.log(author);
  useEffect(() => {
    try {
      async function fetchPosts() {
        const q = query(
          collection(db, "users"),
          where("username", "==", author)
        );

        const listCategory = await getDocs(q);
        listCategory.forEach((d) =>
          setCurrentAuthor({
            ...d.data(),
          })
        );
        if (currentAuthor) {
          const qPost = query(
            collection(db, "posts"),
            where("user.id", "==", currentAuthor?.id)
          );
          const listPosts = await getDocs(qPost);
          const results = [];
          listPosts.forEach((item) =>
            results.push({
              id: item.id,
              ...item.data(),
            })
          );
          console.log(results);
          setListItem(results);
        }
      }
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }, [author, currentAuthor]);

  if (!listItem) return null;

  return (
    <Layout>
      <AuthorPageStyled>
        <div className="container">
          <DashboardHeading
            title={`Author page of " ${
              currentAuthor?.username !== undefined
                ? currentAuthor?.username
                : ""
            } "`}
          ></DashboardHeading>
          <div className="grid-related">
            {listItem.length > 0 &&
              listItem.map((post) => (
                <PostRelatedItem key={post?.id} data={post}></PostRelatedItem>
              ))}
          </div>
        </div>
      </AuthorPageStyled>
    </Layout>
  );
};

export default AuthorPage;
