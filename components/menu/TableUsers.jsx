import { GoCheck } from "react-icons/go";
import { HiOutlineInbox } from "react-icons/hi";

export default function TableUsers({
  students,
  setUserId,
  setShowClass,
  handleShowDeleteUser,
  setUserIdDelete,
}) {
  return (
    <div className=" bg-gray-200 min-h-screen flex flex-col p-28  w-full">
      <div className="w-4/5">
        <div className="flex flex-row justify-between pr-7">
          <h1 className="text-2xl font-semibold mb-5">Students</h1>
          <button
            type="submit"
            onClick={setShowClass}
            className="mb-5 p-2 px-5 rounded-lg text-white font-semibold text-base bg-[#fe4e30] hover:bg-blue-200"
          >
            Add Student
          </button>
        </div>
        <div className=" overflow-auto rounded-lg shadow hidden  md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-xl  font-bold tracking-wide text-left">
                  No
                </th>
                <th className="w-48 p-3 text-xl  font-bold tracking-wide text-left">
                  Name
                </th>
                <th className="w-48 p-3 text-xl  font-bold tracking-wide text-left">
                  Email
                </th>
                <th className="w-20 p-3 text-xl font-bold tracking-wide text-left">
                  Action
                </th>
              </tr>
            </thead>
            {students?.classes[0]?.students.length !== 0 ? (
              <tbody className="divide-y  divide-gray-200">
                {students?.classes[0]?.students?.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white hover:bg-gray-100 cursor-pointer"
                  >
                    <td
                      className="p-3 text-lg text-gray-700 font-bold"
                      onClick={() => setUserId(item.id)}
                    >
                      {index + 1}
                    </td>
                    <td
                      className="p-3 text-lg text-gray-700 whitespace-nowrap"
                      onClick={() => setUserId(item.id)}
                    >
                      {item.firstName}
                    </td>
                    <td
                      className="p-3 w-23 text-lg text-gray-700 whitespace-nowrap"
                      onClick={() => setUserId(item.id)}
                    >
                      {item.email}
                    </td>
                    <td className="  px-20  text-lg text-gray-700 whitespace-nowrap ">
                      <button
                        className=" bg-[#fe4e30] hover:bg-[#e73e2093] px-7 py-1 text-white font-bold  text-[1.20rem] rounded-md"
                        onClick={() => {
                          setUserIdDelete(item.id), handleShowDeleteUser(true);
                        }}
                      >
                        Delete
                      </button>
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
  );
}
