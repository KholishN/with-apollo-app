import { GoCheck } from "react-icons/go";
import { HiOutlineInbox } from "react-icons/hi";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import UpdateAssignment from "./UpdateAssignment";
import DeleteAssignment from "./DeleteAssignment";
import { useState } from "react";

const GET_CATEGORIES = gql`
  query GetCategories($where: SubCategoryFilter) {
    subCategories(where: $where) {
      id
      name
      category
      percentage
      subjects {
        name
        percentage
        id
      }
    }
  }
`;

export default function Assigment({
  userId,
  classTYPE,
  assignments,
  setIdSubject,
  idSubject,
  setNameCategory,
  nameCategory,
  setAssignmentId,
  assignmentId,
}) {
  const { data: categories } = useQuery(GET_CATEGORIES, {
    variables: {
      where: {
        classType: classTYPE,
      },
    },
  });
  const [getAssignmets, { data }] = useLazyQuery(assignments);

  const handleSubject = (e) => {
    e.preventDefault();

    console.log("====================================");
    console.log(e.target.name);
    console.log("====================================");

    getAssignmets({
      variables: {
        where: {
          studentId: userId,
          subject: {
            subCategory: {
              name: e.target.name,
            },
          },
        },
      },
    });
  };

  // get total point
  const resultTotalNilai = data?.assignments?.reduce((total, num) => {
    return total + (num.subject?.percentage * num?.point) / 100;
  }, 0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleUpdate = (id, name, assignmentId) => {
    setShow(true);
    setIdSubject(id);
    setNameCategory(name);
    setAssignmentId(assignmentId);
  };
  // delete
  const [showDelete, setShowDelete] = useState(false);
  const handleDelete = (id, name) => {
    setShowDelete(true);
    setIdSubject(id);
    setNameCategory(name);
  };

  return (
    <>
      <div className=" bg-gray-200 min-h-screen flex flex-col p-28  w-full">
        <div className="w-4/5">
          <div className="flex flex-row justify-between pr-7">
            <h1 className="text-2xl font-semibold mb-5">Assigment</h1>
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
                  <th className="w-20 p-3 text-xl  font-bold tracking-wide text-left">
                    Category
                  </th>
                  <th className="w-80 p-3 text-xl  font-bold tracking-wide text-left">
                    Subject
                  </th>
                  <th className="w-20 p-3 text-xl  font-bold tracking-wide text-center">
                    Point
                  </th>
                  <th className="w-20 p-3 text-xl  font-bold tracking-wide text-center">
                    Assignment
                  </th>
                  <th className="w-20 p-3 text-xl  font-bold tracking-wide text-center">
                    Action
                  </th>
                </tr>
              </thead>
              {data?.assignments?.length !== 0 ? (
                <tbody className="divide-y  divide-gray-200">
                  {data?.assignments?.map((data, idx) => (
                    <tr
                      key={idx}
                      className="bg-white hover:bg-gray-100 cursor-pointer"
                    >
                      <td className="p-3 text-lg text-gray-700 font-bold ">
                        {data?.subject?.subCategory?.name}
                      </td>
                      <td className="p-3 text-lg text-gray-700 font-bold ">
                        {data?.subject?.name}
                      </td>
                      <td className="p-3 text-center text-lg text-gray-700 font-bold ">
                        {data?.point}
                      </td>
                      <td className="p-3 text-center text-lg text-gray-700 font-bold ">
                        {data?.subject?.percentage}%
                      </td>
                      <td>
                        <div className="flex flex-row justify-center">
                          <div className="px-4">
                            <button
                              className=" bg-gray-200 px-5 py-2 white text-[1.20rem] rounded-md "
                              type="Submit"
                              onClick={() =>
                                handleUpdate(
                                  data?.subject?.id,
                                  data?.subject?.subCategory?.name,
                                  data?.id
                                )
                              }
                            >
                              Update
                            </button>
                          </div>
                          <div>
                            <button
                              className=" bg-[#fe4e30] hover:bg-[#e73e2093]  px-5 py-2 text-white font-bold  text-[1.20rem] rounded-md"
                              onClick={() =>
                                handleDelete(
                                  data?.id,
                                  data?.subject?.subCategory?.name
                                )
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gray-300 hover:bg-gray-100 cursor-pointer">
                    <td
                      className="p-3 text-left text-xl text-gray-700 font-extrabold "
                      colSpan={4}
                    >
                      Total
                    </td>
                    <td className="p-3 text-center text-xl text-gray-700 font-extrabold ">
                      {(resultTotalNilai *
                        data?.assignments[0]?.subject?.subCategory
                          ?.percentage) /
                        100}
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody className="divide-y  divide-gray-200">
                  <tr className="bg-white  ">
                    <td
                      colSpan={5}
                      className=" p-3 h-40 text-lg text-gray-700 font-bold text-center"
                    >
                      <div className="flex justify-center ">
                        <HiOutlineInbox className="w-12 h-12 opacity-25" />
                      </div>{" "}
                      <span>No Data</span>
                    </td>
                  </tr>
                </tbody>
              )}
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
      <UpdateAssignment
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        assignments={assignments}
        userId={userId}
        data={data}
        idSubject={idSubject}
        nameCategory={nameCategory}
        assignmentId={assignmentId}
      />
      <DeleteAssignment
        show={showDelete}
        setShow={setShowDelete}
        assignments={assignments}
        userId={userId}
        data={data}
        idSubject={idSubject}
        nameCategory={nameCategory}
      />
    </>
  );
}
