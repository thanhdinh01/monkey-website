import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../../components/layout/Heading";
import PostFeatureItem from "../post/PostFeatureItem";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const HomeFeatureStyled = styled.div`
  padding-bottom: 60px;
  background-color: ${(props) => props.theme.body};
`;

const HomeFeature = () => {
  const [dataFeature, setDataFeature] = useState([]);
  // console.log(dataFeature);

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      where("status", "==", 1),
      where("hotFeature", "==", true),
      limit(3)
    );
    onSnapshot(q, (docs) => {
      let results = [];
      docs.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setDataFeature(results);
      // console.log(results);
    });
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
