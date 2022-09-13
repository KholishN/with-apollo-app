import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { GoCheck } from "react-icons/go";
import { HiOutlineInbox } from "react-icons/hi";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaYinYang } from "react-icons/fa";

const CREAETE_ASSIGNMENT = gql`
  mutation ($input: CreateAssignmentInput!) {
    createAssignment(input: $input) {
      student {
        firstName
        email
      }
      id
      subject {
        id
        name
      }
      point
    }
  }
`;

const GET_CATEGORIES = gql`
  query GetCategories($where: SubCategoryFilter) {
    subCategories(where: $where) {
      id
      name
      category
      subjects {
        name
        percentage
        id
      }
    }
  }
`;
export default function CreateAssigment({ assignments, userId, classTYPE }) {
  const [getCategory, { data: newcategories }] = useLazyQuery(GET_CATEGORIES);
  const [createAssignment] = useMutation(CREAETE_ASSIGNMENT);
  const [form, setForm] = useState({
    point: "",
  });

  const { data: categories } = useQuery(GET_CATEGORIES, {
    variables: {
      where: {
        classType: classTYPE,
      },
    },
  });

  const handleSubject = (e) => {
    e.preventDefault();

    getCategory({
      variables: {
        where: {
          name: e.target.name,
        },
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.name);
    createAssignment({
      variables: {
        input: {
          studentId: userId,
          subjectId: e.currentTarget.id,
          point: form.point,
        },
      },
      refetchQueries: [
        {
          query: assignments,
          variables: {
            where: {
              studentId: userId,
              subject: {
                subCategory: {
                  name: e.currentTarget.name,
                },
              },
            },
          },
        },
      ],
    });
    setForm({ point: "" });
  };
  return (
    <div className=" bg-gray-200 min-h-screen flex flex-col p-28  w-full">
      <div className="w-4/5">
        <div className="flex flex-row justify-between pr-7">
          <h1 className="text-2xl font-bold mb-5">Create Assigment</h1>
          <div className="flex flex-row">
            {categories?.subCategories?.map((item, index) => (
              <div className="px-3" key={index}>
                <button
                  className="mb-5 mr-3 p-2 px-5 rounded-lg text-white font-semibold text-base bg-[#fe4e30]"
                  name={item.name}
                  onClick={handleSubject}
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className=" overflow-auto rounded-lg shadow  md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-40 p-3 text-xl  font-bold tracking-wide text-left">
                  Category
                </th>
                <th className="  px-8 py-2 text-xl   font-bold tracking-wide text-left flex flex-row justify-between">
                  <div>Subject</div>
                  <div className=" mr-5 w-20">Point</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y  divide-gray-200">
              {newcategories?.subCategories.map((item, index) => (
                <tr key={index} className="bg-white cursor-pointer  ">
                  <td
                    rowSpan={item?.subjects.length}
                    className="px-5 text-2xl font-bold hover:bg-gray-100 "
                  >
                    {item?.name}
                  </td>

                  {item?.subjects
                    .filter((x) => x.name !== "test")
                    .map((data, idx) => (
                      <tr className="flex flex-row justify-between p-5 bg-gray-100 hover:bg-gray-200 mt-2 mb-2 rounded-lg mr-2 ">
                        <td className="text-xl font-semibold">{data?.name}</td>

                        <td className="w-10  text-gray-700 font-bold  ">
                          <div className="flex flex-row gap-x-4 h-full justify-center ">
                            <input
                              type="number"
                              id="name"
                              className=" text-center  h-full rounded-lg px-3 bg-gray-300 shadow-md focus:bg-gray-400"
                              name={item?.name}
                              value={form.point}
                              onChange={(e) => {
                                e.preventDefault(),
                                  setForm({
                                    ...form,
                                    point: parseInt(e.target.value),
                                  });
                              }}
                            />
                            <div className="w-32 h-1 flex items-center ">
                              <button
                                name={item.name}
                                id={data.id}
                                className="rounded-full bg-gray-300 text-3xl shadow-md hover:bg-gray-200 focus:bg-gray-300 "
                                onClick={handleSubmit}
                              >
                                <AiOutlinePlus />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          <div
            className="bg-white hover:bg-gray-100 p-4 pr-16 sm:pr-7 rounded-lg shadow"
            key="{index}"
          >
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col item-center space-x-2 text-sm">
                <div className="font-semibold text-2xl">a</div>
                <div className="text-lg">Start : b</div>
                <div className="text-lg">End : c</div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="{item.id}"
                  className="cursor-pointer flex justify-center items-center"
                >
                  <input
                    type="checkbox"
                    defaultChecked=""
                    id="{item.id}"
                    className="appearance-none h-12 w-12 rounded-full border-2 border-none check-box"
                  />
                  <GoCheck className="text-3xl absolute opacity-0 check-1 transition" />
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* nodata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          <div
            className="bg-white hover:bg-gray-100 p-4 pr-16 sm:pr-7 rounded-lg shadow"
            key="{index}"
          >
            <div className="flex flex-row justify-between items-center">
              <div>
                <HiOutlineInbox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
