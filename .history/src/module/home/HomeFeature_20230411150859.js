import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import PostFeatureItem from "../post/PostFeatureItem";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const HomeFeatureStyled = styled.div`
  margin-bottom: 60px;
`;

const HomeFeature = () => {
  const [dataFeature, setDataFeature] = useState([]);
  console.log(dataFeature);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("status", "==", 1),
      where("hotFeature", "==", true)
    );
    let result = [];
    onSnapshot(q, (docs) => {
      docs.forEach((doc) => {
        console.log("doc", doc);
        result.push(doc.data());
      });
    });
    setDataFeature(result);
  }, []);
  return (
    <HomeFeatureStyled>
      <div className="container">
        <Heading>Feature</Heading>
        <div className="grid-layout">
          {dataFeature.length > 0 &&
            dataFeature.map((data) => <PostFeatureItem></PostFeatureItem>)()}
        </div>
      </div>
    </HomeFeatureStyled>
  );
};

export default HomeFeature;
