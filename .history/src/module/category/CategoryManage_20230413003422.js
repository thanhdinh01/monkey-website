import React, { useEffect, useState } from "react";
import { Table } from "../../components/table";
import { IconEdit, IconEye, IconTrash } from "../../components/icon";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { categoryStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import { LabelStatus } from "../../components/label";

const CategoryManage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const collRef = collection(db, "categories");
      onSnapshot(collRef, (docs) => {
        let results = [];
        docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategories(results);
        console.log("results", results);
      });
    }
    fetchCategories();
  }, []);

  return (
    <div>
      <DashboardHeading
        title="List Categories"
        desc="Manage your category"
      ></DashboardHeading>
      <div className="search-postmanage max-w-[300px] w-full ml-auto mb-10">
        <input
          type="text"
          placeholder="Search category ..."
          className="w-full h-full p-4 rounded-lg border border-solid border-gray-300"
        />
      </div>
      <Table>
        <table>
          <thead>
            <tr>
              <th>Id</th>
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
                    <span className="text-gray-600">{item?.id}</span>
                  </td>
                  <td>
                    <span className="text-gray-500">{item?.name}</span>
                  </td>
                  <td>
                    <span className="text-gray-500">{item?.slug}</span>
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
                      <IconEdit className="p-1 cursor-pointer border border-blue-400 rounded-lg text-blue-400"></IconEdit>
                      <IconTrash className="p-1 cursor-pointer border border-red-400 rounded-lg text-red-400"></IconTrash>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Table>
    </div>
  );
};

export default CategoryManage;
