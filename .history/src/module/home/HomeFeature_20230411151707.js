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
  // console.log(dataFeature);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("status", "==", 1),
      where("hotFeature", "==", true)
    );
    let results = [];
    onSnapshot(q, (docs) => {
      docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    });
    setDataFeature(results);
    console.log("results:", results);
  }, []);

  if (dataFeature.length <= 0) return null;

  return (
    <HomeFeatureStyled>
      <div className="container">
        <Heading>Feature</Heading>
        <div className="grid-layout">
          {dataFeature.map((data) => (
            <PostFeatureItem key={data.id} data={data}></PostFeatureItem>
          ))}
        </div>
      </div>
    </HomeFeatureStyled>
  );
};

export default HomeFeature;
