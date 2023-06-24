import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import DashboardHeading from "../module/dashboard/DashboardHeading";
import PostRelatedItem from "../module/post/PostRelatedItem";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setQuery } from "../store/total-search/totalSearchSlice";
import { useSearchParams } from "react-router-dom";

const SearchPageStyled = styled.div`
  background-color: ${(props) => props.theme.body};
  padding-top: 60px;
  padding-bottom: 60px;
  .grid-related {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 40px;
    row-gap: 80px;
    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 80px 40px;
      .related-img {
        width: auto;
      }
    }

    @media screen and (max-width: 426px) {
      grid-template-columns: repeat(1, 1fr);
      gap: 40px 20px;
      .related-img {
        width: 100%;
      }
    }
  }
`;

const SearchPage = () => {
  const { posts } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const slugQuery = params.get("query");

  useEffect(() => {
    console.log("in useEffect");
    const filterPost = JSON.parse(localStorage.getItem("filterPost"));
    const totalQuery = JSON.parse(localStorage.getItem("totalQuery"));
    dispatch(setPosts(filterPost));
    dispatch(setQuery(totalQuery));
  }, [dispatch]);
  return (
    <Layout>
      <SearchPageStyled>
        <div className="container">
          <DashboardHeading
            title={`Results of your search for: "${
              slugQuery !== "all" ? slugQuery : "tất cả"
            }"`}
          ></DashboardHeading>
          <div className="grid-related">
            {posts?.length > 0 &&
              posts.map((post) => (
                <PostRelatedItem
                  key={post?.postId}
                  data={post}
                ></PostRelatedItem>
              ))}
          </div>
        </div>
      </SearchPageStyled>
    </Layout>
  );
};

export default SearchPage;
