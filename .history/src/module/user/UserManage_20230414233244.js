import React, { useEffect, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Button } from "../../components/button";
import { Table } from "../../components/table";
import { useForm } from "react-hook-form";
import { categoryStatus } from "../../utils/constants";
import { LabelStatus } from "../../components/label";
import { IconEdit, IconEye, IconTrash } from "../../components/icon";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { slice } from "lodash";

const UserManage = () => {
  const {
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const [users, serUser] = useState([]);
  const categories = [];

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
              <th>Fullname</th>
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
                    <span className="text-black">{item?.name}</span>
                  </td>
                  <td>
                    <span className="text-gray-500 font-light italic">
                      {item?.slug}
                    </span>
                  </td>
                  <td>
                    {item?.status === categoryStatus.APPROVED && (
                      <LabelStatus type="success">Approved</LabelStatus>
                    )}
                    {item?.status === categoryStatus.UNAPPROVED && (
                      <LabelStatus type="warning">Unapproved</LabelStatus>
                    )}
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
                        // onClick={() => handleDeleteCategory(item?.id)}
                      ></IconTrash>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Table>
      {users.length <= 0 && (
        <p className="text-center text-gray-500 font-light">
          No category found
        </p>
      )}
    </div>
  );
};

export default UserManage;
