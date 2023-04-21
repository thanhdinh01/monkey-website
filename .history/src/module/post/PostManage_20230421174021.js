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
            id: doc.id,
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
            <tr>
              <td>
                <span className="text-gray-500">01</span>
              </td>
              <td>
                <div className="flex gap-4 items-center">
                  <PostImage
                    className=""
                    radius="4px"
                    width="66px"
                    height="55px"
                    src="https://images.unsplash.com/photo-1620490451629-e2eaeda383c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1275&q=80"
                  ></PostImage>
                  <div className="flex flex-col">
                    <span className="font-semibold">One Special 4K Camera</span>
                    <span className="text-sm text-gray-500">
                      Date: 25 Oct 2021
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <span className="text-gray-500">Camera Gear</span>
              </td>
              <td>
                <span className="text-gray-500">Thanhmit</span>
              </td>
              <td>
                <div className="flex items-center gap-4">
                  <IconEye className="p-1 cursor-pointer border border-green-400 rounded-lg text-green-400"></IconEye>
                  <IconEdit className="p-1 cursor-pointer border border-blue-400 rounded-lg text-blue-400"></IconEdit>
                  <IconTrash className="p-1 cursor-pointer border border-red-400 rounded-lg text-red-400"></IconTrash>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Table>
      <div className="pagination">123456</div>
    </PostManageStyled>
  );
};

export default PostManage;
