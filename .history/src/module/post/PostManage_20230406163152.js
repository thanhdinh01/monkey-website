import React from "react";

const PostManage = () => {
  return (
    <div>
      <h1 className="dashboard-heading">Manage post</h1>
      <div className="search-postmanage">
        <input type="text" placeholder="Search post ..." />
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
    </div>
  );
};

export default PostManage;
