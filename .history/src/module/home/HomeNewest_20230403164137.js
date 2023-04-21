import React from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";

const HomeNewestStyled = styled.div``;

const HomeNewest = () => {
  return (
    <HomeNewestStyled>
      <div className="container">
        <Heading>Newest update</Heading>
        <div className="grid-newest">
          <div className="NewestItemMain">
            <img
              src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2294&q=80"
              alt=""
              className="newest-mainImg"
            />
            <div className="post-category">Kiến thức</div>
          </div>
          <div className="NewestItemList"></div>
        </div>
      </div>
    </HomeNewestStyled>
  );
};

export default HomeNewest;
