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
  }
`;

const SearchPage = () => {
  const { posts } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [queryLocal, setQueryLocal] = useState("");
  const [params] = useSearchParams("query");
  console.log("slugQuery", params);
  console.log(posts);

  useEffect(() => {
    console.log("in useEffect");
    const filterPost = JSON.parse(localStorage.getItem("filterPost"));
    const totalQuery = JSON.parse(localStorage.getItem("totalQuery"));
    setQueryLocal(totalQuery);
    dispatch(setPosts(filterPost));
    dispatch(setQuery(totalQuery));
  }, [dispatch]);
  return (
    <Layout>
      <SearchPageStyled>
        <div className="container">
          <DashboardHeading
            title={`Results of your search for: "${
              queryLocal !== "" ? queryLocal : "tất cả"
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
