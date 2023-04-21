import React from "react";
import styled from "styled-components";

const FeatureItemStyled = styled.div``;

const PostFeatureItem = () => {
  return (
    <FeatureItemStyled>
      <img src={require("../../images/image-feature-item.png")} alt="" />
      <div className="overlay"></div>
      <div className="feature-content">
        <div className="post-top">
          <div className="feature-card-category">Kiến thức</div>
          <p className="feature-card-meta">Mar 23 Andiez Le</p>
        </div>
        <div className="feature-title">
          Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
        </div>
      </div>
    </FeatureItemStyled>
  );
};

export default PostFeatureItem;
