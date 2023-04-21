import React, { useEffect } from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import PostFeatureItem from "../post/PostFeatureItem";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const HomeFeatureStyled = styled.div`
  margin-bottom: 60px;
`;

const HomeFeature = () => {
  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("status", "==", 1),
      where("hotFeature", "==", true)
    );

    onSnapshot(q, (doc) => {
      console.log(doc.data());
    });
  }, []);
  return (
    <HomeFeatureStyled>
      <div className="container">
        <Heading>Feature</Heading>
        <div className="grid-layout">
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
          <PostFeatureItem></PostFeatureItem>
        </div>
      </div>
    </HomeFeatureStyled>
  );
};

export default HomeFeature;
