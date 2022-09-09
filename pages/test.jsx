import { gql, useQuery } from "@apollo/client";
import Header from "../components/Header";
import Link from "next/link";

const user = gql`
  {
    users {
      id
      email
      firstName
    }
  }
`;

export default function test() {
  const { data, error, loading } = useQuery(user);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {error.message}</p>;
  // if (data) return <p>{data.users.email}</p>;
  return (
    <>
      <Header />

      <div className="bg-gray-200 min-h-screen flex flex-col p-28 px-52 ">
        <div className="">
          <div className="flex flex-row justify-between">
            <h1 className="text-3xl font-bold mb-5">Batches</h1>
            <button
              className="mb-5 p-2 px-5 rounded-lg text-white font-semibold text-base bg-[#fe4e30]"
              onClick={() => setShow(true)}
            >
              Create Batch
            </button>
          </div>
          <div className="overflow-auto rounded-lg shadow  md:block">
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
                    Action
                  </th>
                </tr>
              </thead>
              {data?.users?.length !== 0 ? (
                <tbody className="divide-y  divide-gray-200">
                  {data.users.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white hover:bg-gray-100 cursor-pointer"
                    >
                      <td className="p-3 text-lg text-gray-700 font-bold">
                        {index + 1}
                      </td>
                      <Link href={`/class/${item.id}`}>
                        <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                          {item.email}
                        </td>
                      </Link>
                      <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                        {item?.email}
                      </td>
                      <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                        {item?.email}
                      </td>

                      {/* <td className="p-3 text-lg  whitespace-nowrap">
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
                    </td> */}
                      {/* <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
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
                    </td> */}
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
        </div>
      </div>
    </>
  );
}
