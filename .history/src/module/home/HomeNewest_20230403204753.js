import React from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import PostNewestItem from "../post/PostNewestItem";
import PostNewestMain from "../post/PostNewestMain";

const HomeNewestStyled = styled.div`
  .grid-newest {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 40px;
    max-height: 560px;
  }

  .newest-list {
    background-color: ${(props) => props.theme.purpleF3};
    border-radius: 16px;
    height: 100%;
    padding: 30px 20px;
    display: grid;
    flex-direction: column;
    grid-template-rows: repeat(3, 1fr);
    &:first-child {
      padding-top: 0;
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
          </div>
        </div>
      </div>
    </HomeNewestStyled>
  );
};

export default HomeNewest;
