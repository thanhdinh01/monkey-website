import React, { useEffect } from "react";
import { LabelDashboard } from "../../components/label";
import { Table } from "../../components/table";
import PostImage from "../post/component/PostImage";
import { IconEdit, IconEye, IconTrash } from "../../components/icon";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const CategoryManage = () => {
  useEffect(() => {
    async function fetchCategories() {
      const collRef = collection(db, "categories");
      onSnapshot(collRef, (docs) => {
        let results = [];
        docs.forEach((doc) => {
          console.log("doc", doc.data());
        });
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
            <tr>
              <td>
                <span className="text-gray-500">01</span>
              </td>
              <td>
                <div className="flex gap-4 items-center">
                  <PostImage
                    className=""
                    radius="4px"
                    width="66px"
                    height="55px"
                    src="https://images.unsplash.com/photo-1620490451629-e2eaeda383c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1275&q=80"
                  ></PostImage>
                  <div className="flex flex-col">
                    <span className="font-semibold">One Special 4K Camera</span>
                    <span className="text-sm text-gray-500">
                      Date: 25 Oct 2021
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <span className="text-gray-500">Camera Gear</span>
              </td>
              <td>
                <span className="text-gray-500">Thanhmit</span>
              </td>
              <td>
                <div className="flex items-center gap-4">
                  <IconEye className="p-1 cursor-pointer border border-green-400 rounded-lg text-green-400"></IconEye>
                  <IconEdit className="p-1 cursor-pointer border border-blue-400 rounded-lg text-blue-400"></IconEdit>
                  <IconTrash className="p-1 cursor-pointer border border-red-400 rounded-lg text-red-400"></IconTrash>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Table>
    </div>
  );
};

export default CategoryManage;
