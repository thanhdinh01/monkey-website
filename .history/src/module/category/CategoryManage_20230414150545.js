import React, { useEffect, useState } from "react";
import { Table } from "../../components/table";
import { IconEdit, IconEye, IconTrash } from "../../components/icon";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { categoryStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import { LabelStatus } from "../../components/label";
import Swal from "sweetalert2";
import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { debounce } from "lodash";

const CategoryManageStyled = styled.div``;

const CategoryManage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [valueSearch, setValueSearch] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      const collRef = collection(db, "categories");
      const queries = query(
        db,
        "categories",
        where("name", "<=", valueSearch),
        where("name", ">=", valueSearch)
      );
      onSnapshot(queries, (docs) => {
        let results = [];
        docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log("results:", results);
        setCategories(results);
      });
    }
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (docId) => {
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
          await deleteDoc(doc(db, "categories", docId));
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeSearch = debounce((e) => {
    // dùng lodash.debounce không sử dụng value, only 'onChange' enought
    setValueSearch(e.target.value);
  }, 500);

  return (
    <CategoryManageStyled>
      <DashboardHeading
        title="List Categories"
        desc="Manage your category"
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
        <input
          type="text"
          placeholder="Search category ..."
          className="h-full p-4 rounded-lg border border-solid border-gray-300"
          onChange={handleChangeSearch}
        />
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
                          navigate(`/manage/update-category?id=${item.id}`)
                        }
                      ></IconEdit>
                      <IconTrash
                        className="p-1 cursor-pointer border border-red-400 rounded-lg text-red-400"
                        onClick={() => handleDeleteCategory(item?.id)}
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
    </CategoryManageStyled>
  );
};

export default CategoryManage;