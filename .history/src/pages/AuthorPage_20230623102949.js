import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import DashboardHeading from "../module/dashboard/DashboardHeading";
import PostRelatedItem from "../module/post/PostRelatedItem";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const AuthorPageStyled = styled.div`
  background-color: ${(props) => props.theme.body};
  padding-top: 60px;
  padding-bottom: 60px;
  .grid-related {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 40px;
    row-gap: 80px;
    @media screen and (max-width: 414px) {
      grid-template-columns: repeat(1, 1fr);
      gap: 40px;
      .related-img {
        width: 100%;
      }
    }
    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 80px 40px;
      .related-img {
        width: auto;
      }
    }
  }
`;

const AuthorPage = () => {
  const [listItem, setListItem] = useState([]);
  const [currentAuthor, setCurrentAuthor] = useState();
  const { author } = useParams();
  const authorNew = author.replace(/-/gm, " ");

  useEffect(() => {
    try {
      async function fetchCurrentUser() {
        const q = query(
          collection(db, "users"),
          where("username", "==", authorNew)
        );

        const listUser = await getDocs(q);
        // console.log("reload 1 ....");
        listUser.forEach((d) =>
          setCurrentAuthor({
            ...d.data(),
          })
        );
      }
      fetchCurrentUser();
    } catch (error) {
      console.log(error);
    }
  }, [authorNew]);

  useEffect(() => {
    try {
      async function fetchPosts() {
        const qPost = query(
          collection(db, "posts"),
          where("user.id", "==", currentAuthor?.id)
        );
        const listPosts = await getDocs(qPost);
        // console.log("reload 2 ....");
        const results = [];
        listPosts.forEach((item) =>
          results.push({
            id: item.id,
            ...item.data(),
          })
        );
        // console.log(results);
        setListItem(results);
      }
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }, [currentAuthor]);

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
