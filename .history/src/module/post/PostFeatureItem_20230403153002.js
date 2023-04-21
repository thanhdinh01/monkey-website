import React from "react";
import styled from "styled-components";

const FeatureItemStyled = styled.div``;

const PostFeatureItem = () => {
  return (
    <FeatureItemStyled>
      <img src={require("../../images/image-feature-item.png")} alt="" />
      <div className="overlay"></div>
      <div className="feature-info">
        <div className="feature-category">Kiến thức</div>
        <p className="feature-meta">Mar 23 Andiez Le</p>
      </div>
    </FeatureItemStyled>
  );
};

export default PostFeatureItem;
