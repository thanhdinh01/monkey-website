import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import PostCategory from "../module/post/component/PostCategory";
import PostImage from "../module/post/component/PostImage";
import PostMeta from "../module/post/component/PostMeta";
import PostTitle from "../module/post/component/PostTitle";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import PostRelated from "../module/post/PostRelated";
import slugify from "slugify";

const DetailPageStyeld = styled.div`
  padding: 120px 0;
  @media screen and (max-width: 414px) {
    padding: 60px 0;
  }
  .post-detail {
    display: flex;
    column-gap: 70px;
    margin-bottom: 50px;
    @media screen and (max-width: 414px) {
      flex-direction: column;
      .imagePostDetail {
        width: 100%;
        height: 300px;
      }
    }
    .detail-content {
      padding: 25px 0;
      .titlePostDetail {
        text-overflow: unset;
        display: block;
        -webkit-line-clamp: unset;
        -webkit-box-orient: unset;
        overflow: unset;
        @media screen and (max-width: 414px) {
          margin: 0;
        }
      }
    }
    .detail-bottom {
      display: flex;
      justify-content: space-between;
      gap: 60px;
    }
  }

  .post-detail-content {
    width: 100%;
    max-width: 820px;
    margin: 0 auto;
    margin-bottom: 35px;
    .chapter * {
      color: ${(props) => props.theme.textInput};
    }
    .chapter-image--unique {
      background-color: ${(props) => props.theme.purpleF3};
      border-radius: 16px;
      display: flex;
      column-gap: 42px;
      .chapter-img-content {
        height: 100%;
        padding: 27px 30px 27px 0;
        h3 {
          font-size: 22px;
          font-weight: 600;
          color: ${(props) => props.theme.primary};
          margin-bottom: 15px;
        }
        p {
          color: ${(props) => props.theme.black23};
          font-size: 18px;
          line-height: 1.5;
          text-align: justify;
        }
      }
    }
  }

  .grid-related {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 40px;
  }
`;

const DetailPage = () => {
  const { slug } = useParams();
  const [postData, setPostData] = useState("");

  // chua hoc redux nen query tam bang slug, sau hoc redux se quay lai query id
  useEffect(() => {
    async function fetchSpecifiedPost() {
      try {
        const q = query(collection(db, "posts"), where("slug", "==", slug));
        const data = await getDocs(q);
        data.forEach((d) => {
          setPostData(d.data());
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchSpecifiedPost();
  }, [slug]);
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      // behavior: "smooth",
    });

    // document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);

  if (!postData) return null;

  return (
    <>
      <Layout>
        <DetailPageStyeld className="detail-page">
          <div className="container">
            <div className="post-detail">
              <PostImage
                className="imagePostDetail"
                width="640px"
                height="360px"
                src={postData?.imageURL}
              ></PostImage>
              <div className="detail-content">
                <PostCategory to={`category/${postData?.category?.slug}`}>
                  {postData?.category?.name}
                </PostCategory>
                <PostTitle
                  to={`post/${postData?.slug}`}
                  color="primary"
                  size="36px"
                  className="mt-6 mb-5 titlePostDetail"
                >
                  {postData?.title}
                </PostTitle>
                <div className="detail-bottom">
                  <PostMeta
                    className="grey-meta"
                    datePost={new Date(
                      postData?.createAt?.seconds * 1000
                    ).toLocaleDateString("vi-VI")}
                    authorPost={postData?.user?.username}
                    dotGrey={true}
                    size="18px"
                    to={`author/${slugify(postData?.user?.username || "", {
                      lower: true,
                    })}`}
                  ></PostMeta>
                  <span className="detail-view text-[18px] font-semibold text-[#6B6B6B]">
                    1204
                  </span>
                </div>
              </div>
            </div>
            <div className="post-detail-content">
              <div
                className="chapter"
                dangerouslySetInnerHTML={{ __html: postData?.content }}
              ></div>
              <div className="chapter-image--unique">
                <PostImage
                  width="150px"
                  height="150px"
                  src={
                    postData?.user?.avatar ||
                    "../../../images/avatar-default.jpg"
                  }
                ></PostImage>
                <div className="chapter-img-content">
                  <h3>{postData?.user?.username}</h3>
                  <p>{postData?.user?.description || "unknown"}</p>
                </div>
              </div>
            </div>
            <PostRelated categoryId={postData?.category?.id}></PostRelated>
          </div>
        </DetailPageStyeld>
      </Layout>
    </>
  );
};

export default DetailPage;
