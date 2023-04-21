import React, { useEffect, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Button } from "../../components/button";
import { Table } from "../../components/table";
import { useForm } from "react-hook-form";
import { userStatus } from "../../utils/constants";
import { LabelStatus } from "../../components/label";
import { IconEdit, IconEye, IconTrash } from "../../components/icon";
import { useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import PostImage from "../post/component/PostImage";
import { userRole } from "../../utils/constants";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const UserManage = () => {
  const {
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const [users, serUser] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      onSnapshot(collection(db, "users"), (users) => {
        let results = [];
        users.forEach((user) => {
          results.push({
            ...user.data(),
          });
        });
        console.log("results", results);
        serUser(results);
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

  const handleDeleteUser = async (userId) => {
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
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <DashboardHeading
        title="Manage Users"
        desc="Manage your users as administrator"
      ></DashboardHeading>
      <div className="search-postmanage h-[60px] max-w-[600px] w-full ml-auto mb-10 flex items-center justify-end gap-5">
        <Button
          to="/manage/add-category"
          type="button"
          kind="primary"
          className="flex-1"
          height="100%"
        >
          Add category
        </Button>
        {/* <input
          type="text"
          placeholder="Search category ..."
          className="h-full p-4 rounded-lg border border-solid border-gray-300"
          onChange={handleChangeSearch}
        /> */}
      </div>
      <Table>
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
            {users.length > 0 &&
              users.map((item) => (
                <tr key={item.id}>
                  <td title={item.id}>
                    <span className="text-black ">
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
                          item?.avatar ||
                          "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                        }
                      ></PostImage>

                      <div className="flex flex-col">
                        <span className="text-black font-semibold text-lg whitespace-nowrap">
                          {item?.fullname}
                        </span>
                        <span className="text-gray-500">14/04/2023</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-black">{item?.username}</span>
                  </td>
                  <td title={item?.email}>
                    <span className="text-black">
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
                  <td>
                    {item?.role === userRole.ADMIN && renderUserRole(item.role)}
                    {item?.role === userRole.MOD && renderUserRole(item.role)}
                    {item?.role === userRole.USER && renderUserRole(item.role)}
                  </td>
                  <td>
                    <div className="flex items-center gap-4">
                      <IconEye className="p-1 cursor-pointer border border-green-400 rounded-lg text-green-400"></IconEye>
                      <IconEdit
                        className="p-1 cursor-pointer border border-blue-400 rounded-lg text-blue-400"
                        onClick={() =>
                          navigate(`/manage/update-user?id=${item.id}`)
                        }
                      ></IconEdit>
                      <IconTrash
                        className="p-1 cursor-pointer border border-red-400 rounded-lg text-red-400"
                        onClick={() => handleDeleteUser(item?.id)}
                      ></IconTrash>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Table>
      {!users && (
        <p className="text-center text-gray-500 font-light">
          No category found
        </p>
      )}
    </div>
  );
};

export default UserManage;
