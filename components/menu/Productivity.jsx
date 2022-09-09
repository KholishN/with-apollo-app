import { GoCheck } from "react-icons/go";
import { HiOutlineInbox } from "react-icons/hi";
import { gql, useQuery } from "@apollo/client";
import CreateProductivity from "./CreateProductivity";
import UpdateProductivity from "./UpdataProductivity";
import DeleteProductivity from "./DeleteProductivity";
import { useState } from "react";

const productivity = gql`
  query getProductivity($where: ProductivityFilter) {
    productivities(where: $where) {
      student {
        id
        firstName
      }
      point
      id
    }
  }
`;

export default function Productivity({ userId }) {
  const { data, error, loading } = useQuery(productivity, {
    variables: {
      where: {
        studentId: userId,
      },
    },
  });

  // update
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // delete
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      {data?.productivities?.length !== 0 ? (
        <div className=" min-h-screen flex flex-col pt-28 items-center w-full">
          <div className="w-4/5">
            <div className="flex flex-row justify-between pr-7">
              <h1 className="text-2xl font-semibold mb-5">Productivity</h1>
              <div>
                <button
                  className="mb-5 mr-3 p-2 px-5 rounded-lg text-white font-semibold text-base bg-[#fe4e30]"
                  onClick={() => setShow(true)}
                >
                  Add Productivity
                </button>
                <button
                  className="mb-5 p-2 px-5 rounded-lg text-white font-semibold text-base bg-[#fe4e30]"
                  onClick={() => setShowDelete(true)}
                >
                  Delete Productivity
                </button>
              </div>
            </div>
            <div className=" overflow-auto rounded-lg shadow  md:block">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="w-20 p-3 text-xl  font-bold tracking-wide  text-center">
                      Point
                    </th>
                  </tr>
                </thead>
                {data?.productivities?.length !== 0 ? (
                  <tbody className="divide-y  divide-gray-200">
                    {data?.productivities?.map((data, idx) => (
                      <tr
                        key={idx}
                        className="bg-white hover:bg-gray-100 cursor-pointer text-center"
                      >
                        <td
                          className="p-3 text-lg text-gray-700 font-bold text-center"
                          colSpan={2}
                        >
                          {data.point}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody className="divide-y  divide-gray-200">
                    <tr className="bg-white  ">
                      <td
                        colSpan={4}
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
          </div>
        </div>
      ) : (
        <CreateProductivity productivity={productivity} userId={userId} />
      )}
      <UpdateProductivity
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        productivity={productivity}
        userId={userId}
        data={data}
      />
      <DeleteProductivity
        show={showDelete}
        setShow={setShowDelete}
        productivity={productivity}
        userId={userId}
        data={data}
      />
    </>
  );
}
