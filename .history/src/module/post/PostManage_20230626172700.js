import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostImage from "./component/PostImage";
import { IconEdit, IconEye, IconTrash } from "../../components/icon";
import { Table } from "../../components/table";
import DashboardHeading from "../dashboard/DashboardHeading";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { userRole, userStatus } from "../../utils/constants";
import { LabelStatus } from "../../components/label";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { handlePostManage } from "../../store/total-search/handlerPostManage";

const PostManageStyled = styled.div`
  .search-post {
    color: ${(props) => props.theme.textInput};
    background-color: ${(props) => props.theme.bgInput};
    &::placeholder {
      color: ${(props) => props.theme.textPlaceholder};
    }
    &:focus {
      background-color: ${(props) => props.theme.bgFocusInput};
      border-color: ${(props) => props.theme.primary};
      color: ${(props) => props.theme.textFocusInput};
    }
  }
  .title-post {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    color: ${(props) => props.theme.textInput};
  }

  th.id {
    width: 10%;
  }
  th.post {
    width: 34%;
  }
  th.category,
  th.status {
    width: 12%;
  }
  th.author {
    width: 15%;
  }
  th.actions {
    width: 17%;
  }
  @media screen and (max-width: 768px) {
    th.id,
    th.post,
    th.category,
    th.status,
    th.author,
    th.actions {
      width: unset;
    }
  }
`;

const PostManage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const { user } = useSelector((state) => state.global);
  const { postManage } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  console.log(postManage);
  useEffect(() => {
    dispatch(handlePostManage(filter));
  }, [dispatch, filter]);

  const handleDeletePost = async (post) => {
    if (user?.role !== userRole.ADMIN && user?.id !== post?.user?.id) {
      Swal.fire(
        "Failed",
        "Only admin rights and user of this account can do this action",
        "warning"
      );
      return;
    }
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
          await deleteDoc(doc(db, "posts", post?.idPost));
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      toast.error(error.message, { pauseOnHover: false, autoClose: 2000 });
      console.log(error);
    }
  };

  const handleEditPost = (post) => {
    if (user?.role !== userRole.ADMIN && user?.id !== post?.user?.id) {
      Swal.fire(
        "Failed",
        "Only admin rights and user of this account can do this action",
        "warning"
      );
      return;
    }
    navigate(`/manage/update-post?id=${post?.idPost}`);
  };

  const handleChangeSearch = debounce((e) => {
    setFilter(e.target.value);
  }, 300);

  const renderUserStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="error">Reject</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;

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
          className="w-full h-full p-4 border border-gray-300 border-solid rounded-lg search-post"
          onChange={handleChangeSearch}
        />
      </div>
      <Table>
        <table>
          <thead>
            <tr>
              <th className="id">Id</th>
              <th className="post">Post</th>
              <th className="category">Category</th>
              <th className="author">Author</th>
              <th className="status">Status</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 &&
              posts.map((post) => (
                <tr key={post.idPost}>
                  <td title={post?.idPost}>
                    <span className="text-desc">
                      {post?.idPost?.slice(0, 5) + "..."}
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
                        <span className="text-sm text-desc">
                          {`created: ${new Date(
                            post?.createAt?.seconds * 1000
                          ).toLocaleDateString("vi-VI")}`}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-desc">{post?.category?.name}</span>
                  </td>
                  <td>
                    <span className="text-desc">{post?.user?.username}</span>
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
                      <IconEye
                        className="p-1 text-green-400 border border-green-400 rounded-lg cursor-pointer"
                        onClick={() => navigate(`/post/${post?.slug}`)}
                      ></IconEye>
                      <IconEdit
                        className="p-1 text-blue-400 border border-blue-400 rounded-lg cursor-pointer"
                        onClick={() => {
                          handleEditPost(post);
                        }}
                      ></IconEdit>
                      <IconTrash
                        className="p-1 text-red-400 border border-red-400 rounded-lg cursor-pointer"
                        onClick={() => {
                          handleDeletePost(post);
                        }}
                      ></IconTrash>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Table>
    </PostManageStyled>
  );
};

export default PostManage;
