import React from "react";
import styled from "styled-components";
import Heading from "../components/layout/Heading";
import Layout from "../components/layout/Layout";
import PostCategory from "../module/post/component/PostCategory";
import PostImage from "../module/post/component/PostImage";
import PostMeta from "../module/post/component/PostMeta";
import PostTitle from "../module/post/component/PostTitle";
import PostRelatedItem from "../module/post/PostRelatedItem";

const DetailPageStyeld = styled.div`
  padding: 120px 0;
  .post-detail {
    display: flex;
    column-gap: 70px;
    align-items: center;

    .detail-bottom {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const DetailPage = () => {
  return (
    <>
      <Layout>
        <DetailPageStyeld className="detail-page">
          <div className="container">
            <div className="post-detail">
              <PostImage
                width="640px"
                height="460px"
                src="https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1883&q=80"
              ></PostImage>
              <div className="detail-content">
                <PostCategory>Kiến thức</PostCategory>
                <PostTitle color="primary" size="36px" className="mt-6 mb-5">
                  Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
                </PostTitle>
                <div className="detail-bottom">
                  <PostMeta
                    className="grey-meta"
                    datePost="Mar 23"
                    authorPost="Andiez Le"
                    dotGrey={true}
                  ></PostMeta>
                  <span className="detail-view text-[18px] font-semibold">
                    1204
                  </span>
                </div>
              </div>
            </div>
            <div className="post-detail-content">
              <div className="chapter">
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
                  <PostImage src="https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1883&q=80"></PostImage>
                  <span className="chapter-img-desc">
                    Gastronomy atmosphere set aside. Slice butternut cooking
                    home.
                  </span>
                </div>
              </div>
              <div className="chapter">
                <h3 className="chapter-title">Chương 2</h3>
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
                  greens.
                </p>
                <div className="chapter-image--unique">
                  <PostImage src="https://images.unsplash.com/photo-1514315384763-ba401779410f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1883&q=80"></PostImage>
                  <div className="chapter-img-content">
                    <h3>Jake Sullivan</h3>
                    <p>
                      Gastronomy atmosphere set aside. Slice butternut cooking
                      home. Delicious romantic undisturbed raw platter will
                      meld. Thick Skewers skillet natural, smoker soy sauce wait
                      roux. Gastronomy atmosphere set aside. Slice butternut
                      cooking home.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="post-related">
              <Heading>Bài viết liên quan</Heading>
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
