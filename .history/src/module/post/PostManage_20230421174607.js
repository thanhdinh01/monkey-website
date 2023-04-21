import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostImage from "./component/PostImage";
import { IconEdit, IconEye, IconTrash } from "../../components/icon";
import { Table } from "../../components/table";
import DashboardHeading from "../dashboard/DashboardHeading";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const PostManageStyled = styled.div``;

const PostManage = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPost() {
      onSnapshot(collection(db, "posts"), (docs) => {
        let results = [];
        docs.forEach((doc) => {
          results.push({
            idPost: doc.id,
            ...doc.data(),
          });
        });
        setPostList(results);
        console.log("results", results);
      });
    }
    fetchPost();
  }, []);
  return (
    <PostManageStyled>
      <DashboardHeading
        title="Manage Post"
        desc="Manage all posts"
      ></DashboardHeading>
      <div className="search-postmanage max-w-[300px] w-full ml-auto mb-10">
        <input
          type="text"
          placeholder="Search post ..."
          className="w-full h-full p-4 rounded-lg border border-solid border-gray-300"
        />
      </div>
      <Table>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Post</th>
              <th>Category</th>
              <th>Author</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {postList.length > 0 &&
              postList.map((post) => (
                <tr key={post.idPost}>
                  <td>
                    <span className="text-gray-500">
                      {post?.idPost.slice(0, 5) + "..."}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-4 items-center">
                      <PostImage
                        className=""
                        radius="4px"
                        width="66px"
                        height="55px"
                        src={post?.imageURL}
                      ></PostImage>
                      <div className="flex flex-col">
                        <span className="font-semibold">{post?.title}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(post?.createAt * 1000).toLocaleDateString(
                            "vi-VI"
                          )}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-500">
                      {post?.category?.name}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-500">{post?.user?DashboardHeading.u}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-4">
                      <IconEye className="p-1 cursor-pointer border border-green-400 rounded-lg text-green-400"></IconEye>
                      <IconEdit className="p-1 cursor-pointer border border-blue-400 rounded-lg text-blue-400"></IconEdit>
                      <IconTrash className="p-1 cursor-pointer border border-red-400 rounded-lg text-red-400"></IconTrash>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Table>
      <div className="pagination">123456</div>
    </PostManageStyled>
  );
};

export default PostManage;
