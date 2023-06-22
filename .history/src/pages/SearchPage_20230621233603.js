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

  return (
    <Layout>
      <SearchPageStyled>
        <div className="container">
          <DashboardHeading
            title={`Author page of " ${query} "`}
          ></DashboardHeading>
          <div className="grid-related">
            {listItem.length > 0 &&
              listItem.map((post) => (
                <PostRelatedItem key={post?.id} data={post}></PostRelatedItem>
              ))}
          </div>
        </div>
      </SearchPageStyled>
    </Layout>
  );
};

export default SearchPage;
