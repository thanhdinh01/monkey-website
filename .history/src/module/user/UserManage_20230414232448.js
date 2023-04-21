import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { Button } from "../../components/button";
import { Table } from "../../components/table";
import { useForm } from "react-hook-form";
import { categoryStatus } from "../../utils/constants";
import { LabelStatus } from "../../components/label";
import { IconEdit, IconEye, IconTrash } from "../../components/icon";
import { useNavigate } from "react-router-dom";

const UserManage = () => {
  const {
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const categories = [];

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
              <th>Name category</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="text-black ">{item?.id}</span>
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
      {categories.length <= 0 && (
        <p className="text-center text-gray-500 font-light">
          No category found
        </p>
      )}
    </div>
  );
};

export default UserManage;
