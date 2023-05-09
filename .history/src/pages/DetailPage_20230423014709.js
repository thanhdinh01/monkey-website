import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Heading from "../components/layout/Heading";
import Layout from "../components/layout/Layout";
import PostCategory from "../module/post/component/PostCategory";
import PostImage from "../module/post/component/PostImage";
import PostMeta from "../module/post/component/PostMeta";
import PostTitle from "../module/post/component/PostTitle";
import PostRelatedItem from "../module/post/PostRelatedItem";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

const DetailPageStyeld = styled.div`
  padding: 120px 0;
  .post-detail {
    display: flex;
    column-gap: 70px;
    margin-bottom: 50px;
    .detail-content {
      padding: 25px 0;
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
  console.log(postData);
  if (!postData) return null;

  return (
    <>
      <Layout>
        <DetailPageStyeld className="detail-page">
          <div className="container">
            <div className="post-detail">
              <PostImage
                width="640px"
                height="360px"
                src={postData?.imageURL}
              ></PostImage>
              <div className="detail-content">
                <PostCategory>{postData?.category?.name}</PostCategory>
                <PostTitle
                  to={`post/${postData?.slug}`}
                  color="primary"
                  size="36px"
                  className="mt-6 mb-5"
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
                  ></PostMeta>
                  <span className="detail-view text-[18px] font-semibold text-[#6B6B6B]">
                    1204
                  </span>
                </div>
              </div>
            </div>
            <div className="post-detail-content">
              {/* <div className="chapter">
                <h3 className="chapter-title">Chương 1</h3>
                <p className="chapter-content">
                  Gastronomy atmosphere set aside. Slice butternut cooking home.
                  Delicious romantic undisturbed raw platter will meld. Thick
                  Skewers skillet natural, smoker soy sauce wait roux. slices
                  rosette bone-in simmer precision alongside baby leeks.
                  Crafting renders aromatic enjoyment, then slices taco. Minutes
                  undisturbed cuisine lunch magnificent mustard curry. Juicy
                  share baking sheet pork. Meals ramen rarities selection, raw
                  pastries richness magnificent atmosphere. Sweet soften
                  dinners, cover mustard infused skillet, Skewers on culinary
                  experience. Juicy meatballs brisket slammin' baked shoulder.
                  Juicy smoker soy sauce burgers brisket. polenta mustard hunk
                  greens. Wine technique snack skewers chuck excess. Oil heat
                  slowly. slices natural delicious, set aside magic tbsp
                  skillet, bay leaves brown centerpiece. fruit soften edges
                  frond slices onion snack pork steem on wines excess technique
                  cup; Cover smoker soy sauce fruit snack. Sweet one-dozen
                  scrape delicious, non sheet raw crunch mustard. Minutes clever
                  slotted tongs scrape, brown steem undisturbed rice. Food
                  qualities braise chicken cuts bowl through slices butternut
                  snack. Tender meat juicy dinners. One-pot low heat plenty of
                  time adobo fat raw soften fruit. sweet renders bone-in marrow
                  richness kitchen, fricassee basted pork shoulder. Delicious
                  butternut squash hunk. Flavor centerpiece plate, delicious
                  ribs bone-in meat, excess chef end. sweet effortlessly pork,
                  low heat smoker soy sauce flavor meat, rice fruit fruit.
                  Romantic fall-off-the-bone butternut chuck rice burgers.
                </p>
                <div className="chapter-image">
                  <PostImage
                    width="820px"
                    height="500px"
                    src="https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1883&q=80"
                  ></PostImage>
                  <span className="chapter-img-desc">
                    Gastronomy atmosphere set aside. Slice butternut cooking
                    home.
                  </span>
                </div>
              </div> */}
              <div
                className="chapter"
                dangerouslySetInnerHTML={{ __html: postData?.content }}
              ></div>
              <div className="chapter-image--unique">
                <PostImage
                  width="237px"
                  height="237px"
                  src={postData?.user?.avatar}
                ></PostImage>
                <div className="chapter-img-content">
                  <h3>{postData?.user?.username}</h3>
                  <p>{postData?.user?.description || "unknown"}</p>
                </div>
              </div>
            </div>
            <div className="post-related">
              <Heading className="primary-heading">Bài viết liên quan</Heading>
              <div className="grid-related">
                <PostRelatedItem></PostRelatedItem>
                <PostRelatedItem></PostRelatedItem>
                <PostRelatedItem></PostRelatedItem>
                <PostRelatedItem></PostRelatedItem>
              </div>
            </div>
          </div>
        </DetailPageStyeld>
      </Layout>
    </>
  );
};

export default DetailPage;
