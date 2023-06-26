import React, { useEffect, useId, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Button } from "../../components/button";
import { Table } from "../../components/table";
import { useForm } from "react-hook-form";
import { userStatus } from "../../utils/constants";
import { LabelStatus } from "../../components/label";
import { IconEdit, IconEye, IconTrash } from "../../components/icon";
import { useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";
import PostImage from "../post/component/PostImage";
import { userRole } from "../../utils/constants";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/authContext";
import slugify from "slugify";
import styled from "styled-components";

const UserManageStyled = styled.div`
  .text-user {
    color: ${(props) => props.theme.textInput};
  }
  @media screen and (max-width: 1440px) {
    .user-manage {
      overflow: scroll;
    }
    table {
      min-width: max-content;
    }
  }
`;

const UserManage = () => {
  const {
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const [usersList, serUserList] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    async function fetchUser() {
      onSnapshot(collection(db, "users"), (users) => {
        let results = [];
        users.forEach((user) => {
          results.push({
            ...user.data(),
          });
        });
        results.sort((a, b) => a.status - b.status);
        const ad = results.filter((item) => item.role === 1);
        const indexAd = results.findIndex((item) => item.role === 1);
        const mode = results.filter((item) => item.role === 2);
        results.splice(indexAd, 1);
        for (let i = 0; results.length - 1; i++) {
          // console.log(results[i]);
          // if (results[i].status === 2) {
          //   results.splice(i, 1);
          // }
        }
        results.concate(ad.concat(mode));
        console.log(results);
        serUserList(results);
      });
    }
    fetchUser();
  }, []);

  const renderUserStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="error">Banned</LabelStatus>;

      default:
        break;
    }
  };

  const renderUserRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Moderator";
      case userRole.USER:
        return "User";

      default:
        break;
    }
  };

  const handleDeleteUser = async (userId, item) => {
    if (authUser?.uid !== userId) {
      Swal.fire(
        "Failed",
        `Only user ${item?.username.toUpperCase()} can do this action`,
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
          await deleteDoc(doc(db, "users", userId));
          await auth.currentUser.delete();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      toast.error(error.message, { pauseOnHover: false, autoClose: 2000 });
      console.log(error);
    }
  };

  const handleSwitchEditPage = (userId) => {
    if (authUser?.role !== userRole.ADMIN) {
      Swal.fire("Failed", "Only admin rights can do this action", "warning");
      return;
    }
    navigate(`/manage/update-user?id=${userId}`);
  };

  return (
    <UserManageStyled>
      <DashboardHeading
        title="Manage Users"
        desc="Manage your users as administrator"
      ></DashboardHeading>
      <div className="search-postmanage h-[60px] max-w-[600px] w-full ml-auto mb-10 flex items-center justify-end gap-5">
        <Button
          to="/manage/add-user"
          type="button"
          kind="primary"
          className="flex-1"
          height="100%"
        >
          Add User
        </Button>
        {/* <input
          type="text"
          placeholder="Search category ..."
          className="h-full p-4 border border-gray-300 border-solid rounded-lg"
          onChange={handleChangeSearch}
        /> */}
      </div>
      <Table className="user-manage">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Information</th>
              <th>Username</th>
              <th>Email address</th>
              <th>Status</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList.length > 0 &&
              usersList.map((item) => (
                <tr key={item.id}>
                  <td title={item.id}>
                    <span className="text-desc">
                      {item?.id.slice(0, 7) + "..."}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-4">
                      <PostImage
                        width="40px"
                        height="40px"
                        radius="100%"
                        src={
                          item?.avatar || "../../../images/avatar-default.jpg"
                        }
                      ></PostImage>

                      <div className="flex flex-col">
                        <span className="text-lg font-semibold text-user whitespace-nowrap">
                          {item?.fullname}
                        </span>
                        <span className="text-desc">
                          created:{" "}
                          {new Date(
                            item?.createAt?.seconds * 1000
                          ).toLocaleDateString("vi-VI")}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-desc">{item?.username}</span>
                  </td>
                  <td title={item?.email}>
                    <span className="text-desc">
                      {item?.email.length > 20
                        ? item?.email.slice(-8)
                        : item?.email}
                    </span>
                  </td>
                  <td>
                    {item?.status === userStatus.ACTIVE &&
                      renderUserStatus(item.status)}
                    {item?.status === userStatus.PENDING &&
                      renderUserStatus(item.status)}
                    {item?.status === userStatus.BAN &&
                      renderUserStatus(item.status)}
                  </td>
                  <td className="text-desc">
                    {item?.role === userRole.ADMIN && renderUserRole(item.role)}
                    {item?.role === userRole.MOD && renderUserRole(item.role)}
                    {item?.role === userRole.USER && renderUserRole(item.role)}
                  </td>
                  <td>
                    <div className="flex items-center gap-4 actions-user">
                      <IconEye
                        className="p-1 text-green-400 border border-green-400 rounded-lg cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/author/${slugify(item?.username, {
                              lower: true,
                            })}`
                          )
                        }
                      ></IconEye>
                      <IconEdit
                        className="p-1 text-blue-400 border border-blue-400 rounded-lg cursor-pointer"
                        onClick={() => {
                          handleSwitchEditPage(item.id);
                        }}
                      ></IconEdit>
                      <IconTrash
                        className="p-1 text-red-400 border border-red-400 rounded-lg cursor-pointer"
                        onClick={() => handleDeleteUser(item?.id, item)}
                      ></IconTrash>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Table>
      {usersList.length === 0 && (
        <p className="font-light text-center text-gray-500">No User found</p>
      )}
    </UserManageStyled>
  );
};

export default UserManage;
