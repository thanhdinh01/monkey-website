import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostImage from "./component/PostImage";
import { IconEdit, IconEye, IconTrash } from "../../components/icon";
import { Table } from "../../components/table";
import DashboardHeading from "../dashboard/DashboardHeading";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { userStatus } from "../../utils/constants";
import { LabelStatus } from "../../components/label";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PostManageStyled = styled.div`
  .title-post {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

const PostManage = () => {
  const navigate = useNavigate();
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

  const handleDeletePost = async (postId) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(doc(db, "posts", postId));
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      toast.error(error.message, { pauseOnHover: false, autoClose: 2000 });
      console.log(error);
    }
  };

  const renderUserStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="error">Pending</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Reject</LabelStatus>;

      default:
        break;
    }
  };
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
                  <td title={post?.idPost}>
                    <span className="text-gray-500">
                      {post?.idPost.slice(0, 5) + "..."}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-4 items-center max-w-[400px]">
                      <PostImage
                        className=""
                        radius="4px"
                        width="66px"
                        height="55px"
                        src={post?.imageURL}
                      ></PostImage>
                      <div className="flex flex-col">
                        <span className="font-semibold title-post">
                          {post?.title}
                        </span>
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
                    <span className="text-gray-500">
                      {post?.user?.username}
                    </span>
                  </td>
                  <td>
                    {post?.status === userStatus.ACTIVE &&
                      renderUserStatus(userStatus.ACTIVE)}
                    {post?.status === userStatus.PENDING &&
                      renderUserStatus(userStatus.PENDING)}
                    {post?.status === userStatus.BAN &&
                      renderUserStatus(userStatus.BAN)}
                  </td>
                  <td>
                    <div className="flex items-center gap-4">
                      <IconEye className="p-1 cursor-pointer border border-green-400 rounded-lg text-green-400"></IconEye>
                      <IconEdit
                        className="p-1 cursor-pointer border border-blue-400 rounded-lg text-blue-400"
                        onClick={() =>
                          navigate(`/manage/update-post?id=${post?.idPost}`)
                        }
                      ></IconEdit>
                      <IconTrash
                        className="p-1 cursor-pointer border border-red-400 rounded-lg text-red-400"
                        onClick={() => handleDeletePost(post?.idPost)}
                      ></IconTrash>
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
