import React from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import DashboardHeading from "../module/dashboard/DashboardHeading";
import PostRelatedItem from "../module/post/PostRelatedItem";
import { useSelector } from "react-redux";

const SearchPageStyled = styled.div`
  background-color: ${(props) => props.theme.body};
  padding-top: 60px;
  padding-bottom: 60px;
  .grid-related {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 40px;
    row-gap: 80px;
  }
`;

const SearchPage = () => {
  const { posts, query } = useSelector((state) => state.search);
  console.log(posts);
  return (
    <Layout>
      <SearchPageStyled>
        <div className="container">
          <DashboardHeading
            title={`Results of your search for: " ${query} "`}
          ></DashboardHeading>
          <div className="grid-related">
            {posts.length > 0 &&
              posts.map((post) => (
                <PostRelatedItem key={post?.id} data={post}></PostRelatedItem>
              ))}
          </div>
        </div>
      </SearchPageStyled>
    </Layout>
  );
};

export default SearchPage;
