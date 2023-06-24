import React from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import PostNewestItem from "../post/PostNewestItem";
import PostNewestMain from "../post/PostNewestMain";

const HomeNewestStyled = styled.div`
  background-color: ${(props) => props.theme.body};
  padding-bottom: 60px;
  .grid-newest {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
    min-height: 560px;
    @media screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }
  }

  .newest-list {
    background-color: ${(props) => props.theme.bodySecond};
    border-radius: 16px;
    height: 100%;
    padding: 0 20px;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    max-height: 580px;
    overflow-y: auto;
    @media screen and (max-width: 768px) {
      max-height: none;
      overflow-y: none;
    }
  }
`;

const HomeNewest = () => {
  return (
    <HomeNewestStyled>
      <div className="container">
        <Heading>Newest update</Heading>
        <div className="grid-newest">
          <PostNewestMain></PostNewestMain>
          <div className="newest-list">
            <PostNewestItem></PostNewestItem>
            <PostNewestItem></PostNewestItem>
            <PostNewestItem></PostNewestItem>
            <PostNewestItem></PostNewestItem>
            <PostNewestItem></PostNewestItem>
          </div>
        </div>
      </div>
    </HomeNewestStyled>
  );
};

export default HomeNewest;
