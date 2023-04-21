import React, { useEffect, useState } from "react";
import { LabelDashboard } from "../../components/label";
import { Table } from "../../components/table";
import PostImage from "../post/component/PostImage";
import { IconEdit, IconEye, IconTrash } from "../../components/icon";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { categoryStatus } from "../../utils/constants";

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
      <LabelDashboard
        title="List Categories"
        desc="Manage your category"
      ></LabelDashboard>
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
                <tr>
                  <td>
                    <span className="text-gray-500">{item?.id}</span>
                  </td>
                  <td>
                    <span className="text-gray-500">{item?.name}</span>
                  </td>
                  <td>
                    <span className="text-gray-500">{item?.slug}</span>
                  </td>
                  <td>
                    {item?.status === categoryStatus.APPROVED && (
                      <span className="bg-green-200 rounded-lg p-2 text-white">
                        Approved
                      </span>
                    )}
                    {item?.status === categoryStatus.UNAPPROVED && (
                      <span className="text-gray-500">Unapproved</span>
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