import React from "react";
import styled from "styled-components";
import PostImage from "./component/PostImage";
import { IconEdit, IconEye, IconTrash } from "../../components/icon";

const PostManageStyled = styled.div`
  .posts-table {
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 40px;
    table {
      width: 100%;
      background-color: white;
      thead {
        background-color: #f7f7f8;
      }
      th {
        padding: 20px 30px;
        text-align: left;
        font-weight: 600;
      }
      td {
        padding: 15px 30px;
      }
    }
  }
`;

const PostManage = () => {
  return (
    <PostManageStyled>
      <h1 className="dashboard-heading">Manage post</h1>
      <div className="search-postmanage max-w-[300px] w-full ml-auto mb-10">
        <input
          type="text"
          placeholder="Search post ..."
          className="w-full h-full p-4 rounded-lg border border-solid border-gray-300"
        />
      </div>
      <div className="posts-table">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Post</th>
              <th>Category</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>
                <div className="flex gap-4 items-center">
                  <PostImage
                    className=""
                    radius="4px"
                    width="66px"
                    height="55px"
                    src="https://images.unsplash.com/photo-1537141440647-35f2b2761904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
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
                  <IconEye className="p-2 cursor-pointer border border-gray-400 rounded-lg text-gray-400"></IconEye>
                  <IconEdit></IconEdit>
                  <IconTrash></IconTrash>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pagination">123456</div>
    </PostManageStyled>
  );
};

export default PostManage;
