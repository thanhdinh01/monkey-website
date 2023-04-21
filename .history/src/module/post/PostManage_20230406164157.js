import React from "react";
import styled from "styled-components";

const PostManageStyled = styled.div``;

const PostManage = () => {
  return (
    <PostManageStyled>
      <h1 className="dashboard-heading">Manage post</h1>
      <div className="search-postmanage max-w-[300px] w-full ml-auto">
        <input
          type="text"
          placeholder="Search post ..."
          className="w-full h-full p-4 rounded-lg border border-solid border-grey-300"
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
              <td>One Special 4K Camera</td>
              <td>Camera Gear</td>
              <td>Thanhmit</td>
              <td>CRUD</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pagination">123456</div>
    </PostManageStyled>
  );
};

export default PostManage;
