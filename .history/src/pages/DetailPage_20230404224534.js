import React from "react";
import Layout from "../components/layout/Layout";
import PostCategory from "../module/post/component/PostCategory";
import PostImage from "../module/post/component/PostImage";
import PostMeta from "../module/post/component/PostMeta";
import PostTitle from "../module/post/component/PostTitle";

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
            <PostImage src="https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=383&q=80"></PostImage>
            <div className="detail-content">
              <PostCategory>Kiến thức</PostCategory>
              <PostTitle>
                Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
              </PostTitle>
              <PostMeta
                datePost="Mar 23"
                authorPost="Andiez Le"
                dotGrey={true}
              ></PostMeta>
              <span className="detail-view">1204</span>
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
