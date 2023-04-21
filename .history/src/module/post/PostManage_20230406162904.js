import React from "react";

const PostManage = () => {
  return (
    <div>
      <h1 className="dashboard-heading">Manage post</h1>
      <div className="search-postmanage">
        <input type="text" placeholder="Search post ..." />
      </div>
      <table className="posts-table">
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
          <tr>01</tr>
          <tr>One Special 4K Camera</tr>
          <tr>Camera Gear</tr>
          <tr>Thanhmit</tr>
          <tr>CRUD</tr>
        </tbody>
      </table>
      <div className="pagination">123456</div>
    </div>
  );
};

export default PostManage;
