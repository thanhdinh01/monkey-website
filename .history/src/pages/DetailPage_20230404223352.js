import React from "react";
import Layout from "../components/layout/Layout";

const DetailPage = () => {
  return (
    <>
      <Layout>
        <div className="container">
          <div className="post-detail">
            <div className="detail-image">
              <img
                src="https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=383&q=80"
                alt=""
              />
            </div>
          </div>
          <div className="post-detail-content">
            <div className="chapter1"></div>
            <div className="chapter1"></div>
          </div>
          <div className="post-related"></div>
        </div>
      </Layout>
    </>
  );
};

export default DetailPage;
