import React, { useEffect, useState } from "react";
import Heading from "../../components/layout/Heading";
import PostRelatedItem from "./PostRelatedItem";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import styled from "styled-components";

const PostRelatedStyled = styled.div`
  .my-swiper {
    .swiper-wrapper {
      .swiper-slide {
        height: auto;
        & > div {
          height: 100%;
        }
      }
    }
    .swiper-pagination {
      top: 95%;
      .swiper-pagination-bullet.swiper-pagination-bullet-active {
        background-color: ${(props) => props.theme.primary};
      }
      .swiper-pagination-bullet {
        background-color: #ccc;
      }
    }
  }
`;

const PostRelated = ({ categoryId = "" }) => {
  const { slug } = useParams();
  const [postRelatedArr, setPostRRelatedArr] = useState([]);

  // query related post
  useEffect(() => {
    async function fetchRelatedPost() {
      if (!categoryId) return null;
      try {
        const q = query(
          collection(db, "posts"),
          where("category.id", "==", categoryId)
        );
        const results = [];
        const data = await getDocs(q);
        data.forEach((d) => {
          results.push({
            id: d.id,
            ...d.data(),
          });
        });
        if (results.length > 0) {
          const indexCurrentPost = results.findIndex(
            (item) => item.slug === slug
          );
          if (results !== -1) {
            results.splice(indexCurrentPost, 1);
          }
        }
        setPostRRelatedArr(results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRelatedPost();
  }, [categoryId, slug]);

  return (
    <PostRelatedStyled className="post-related">
      <Heading className="primary-heading">Bài viết liên quan</Heading>
      <Swiper
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        breakpoints={{
          427: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
        className="my-swiper"
      >
        {postRelatedArr.length > 0 &&
          postRelatedArr.map((related) => (
            <SwiperSlide key={related?.id}>
              <PostRelatedItem data={related}></PostRelatedItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </PostRelatedStyled>
  );
};

export default PostRelated;
