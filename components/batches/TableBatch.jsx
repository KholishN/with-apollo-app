import { gql, useQuery } from "@apollo/client";
import { GoCheck } from "react-icons/go";
import { HiOutlineInbox } from "react-icons/hi";
import Link from "next/link";

const batches = gql`
  {
    batches {
      id
      name
      startedAt
      endedAt
    }
  }
`;
export default function TableBatch({
  setShow,
  setShowUpdate,
  setBatch,
  setShowDelete,
  batches,
}) {
  const { data, error, loading } = useQuery(batches);
  const time = new Date();
  const date = time.toISOString()?.substr(0, 10);

  if (loading) return <p>Loading...</p>;
  return (
    <div className="bg-gray-200 h-screen flex flex-col pt-28 items-center">
      <div className="">
        <div className="flex flex-row justify-between pr-7">
          <h1 className="text-2xl font-semibold mb-5">Batches</h1>
          <button
            className="mb-5 p-2 px-5 rounded-lg text-white font-semibold text-base bg-[#fe4e30]"
            onClick={() => setShow(true)}
          >
            Create Batch
          </button>
        </div>
        <div className=" overflow-auto rounded-lg shadow  md:block">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-xl  font-bold tracking-wide text-left">
                  No
                </th>
                <th className="p-3 text-xl  font-bold tracking-wide text-left">
                  Batch
                </th>
                <th className="w-48 p-3 text-xl  font-bold tracking-wide text-left">
                  Start
                </th>
                <th className="w-48 p-3 text-xl  font-bold tracking-wide text-left">
                  End
                </th>
                <th className="w-48 p-3 text-xl  font-bold tracking-wide text-left">
                  Status
                </th>
                <th className="w-48 p-3 text-xl  font-bold tracking-wide text-left">
                  Status
                </th>
              </tr>
            </thead>
            {data?.batches?.length !== 0 ? (
              <tbody className="divide-y  divide-gray-200">
                {data.batches.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="p-3 text-lg text-gray-700 font-bold">
                      {index + 1}
                    </td>
                    <Link href={`/class/${item.id}`}>
                      <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                        {item.name}
                      </td>
                    </Link>
                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                      {item?.startedAt?.substr(0, 10)}
                    </td>
                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                      {item?.endedAt?.substr(0, 10)}
                    </td>

                    <td className="p-3 text-lg  whitespace-nowrap">
                      <span
                        className={
                          item?.endedAt?.substr(0, 10) <= date
                            ? "p-1.5 text-xs font-semibold uppercase tracking-wider text-green-400 bg-green-200 rounded-lg bg-opacity-40 "
                            : "p-1.5 text-xs font-semibold uppercase tracking-wider text-yellow-400 bg-yellow-200 rounded-lg bg-opacity-40"
                        }
                      >
                        {item?.endedAt?.substr(0, 10) <= date
                          ? "Finish"
                          : "Ongoing"}
                      </span>
                    </td>
                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                      <button
                        type="Submit"
                        onClick={() => {
                          setBatch(item.id), setShowUpdate(true);
                        }}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => {
                          setBatch(item.id), setShowDelete(true);
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
                    colSpan={3}
                    className=" p-3  text-lg text-gray-700 font-bold text-center"
                  >
                    <div className="flex justify-center h-40">
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
          {data.batches.map((item, index) => (
            <div
              className="bg-white hover:bg-gray-100 p-4 pr-16 sm:pr-7 rounded-lg shadow"
              key={index}
            >
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col item-center space-x-2 text-sm">
                  <div className="font-semibold text-2xl">{item.name}</div>
                  <div className="text-lg">
                    Start : {item?.startedAt?.substr(0, 10)}
                  </div>
                  <div className="text-lg">
                    End : {item?.endedAt?.substr(0, 10)}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor={item.id}
                    className="cursor-pointer flex justify-center items-center"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={
                        item?.endedAt?.substr(0, 10) <= date ? "check" : ""
                      }
                      id={item.id}
                      className="appearance-none h-12 w-12 rounded-full border-2 border-none check-box"
                    />
                    <GoCheck className="text-3xl absolute opacity-0 check-1 transition" />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
