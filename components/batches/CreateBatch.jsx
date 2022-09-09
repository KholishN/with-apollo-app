import { CgClose } from "react-icons/cg";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const Create_Batch = gql`
  mutation ($name: String, $startedAt: DateTime, $endedAt: DateTime) {
    createBatch(
      input: { name: $name, startedAt: $startedAt, endedAt: $endedAt }
    ) {
      id
      name
      startedAt
      endedAt
    }
  }
`;

export default function CreateBatch({ show, handleClose, setShow, batches }) {
  if (!show) return null;
  const [createBatch] = useMutation(Create_Batch);

  const [form, setForm] = useState({
    name: "",
    startedAt: "",
    endedAt: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBatch({
      variables: {
        name: form.name,
        startedAt: form.startedAt,
        endedAt: form.endedAt,
      },
      refetchQueries: [{ query: batches }],
    }).then((response) => console.log(response));

    setShow(false);
  };
  return (
    <div className="fixed inset-0 bg-black  bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="flex justify-center">
        <div className=" w-97 bg-white rounded-lg shadow ">
          <div className="p-8">
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl font-semibold mb-7">Create Batch</h1>
              <CgClose
                className="text-2xl font-extrabold cursor-pointer"
                onClick={handleClose}
              />
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label htmlFor="name" className="mb-3 text-lg font-medium">
                Name Batch
              </label>
              <input
                type="text"
                id="name"
                className="mb-5 h-12 rounded-lg px-3 bg-gray-200 shadow focus:bg-gray-300"
                name="name"
                onChange={handleChange}
              />
              <div className="flex flex-row justify-evenly">
                <div className="flex flex-col w-full mr-3">
                  <label htmlFor="start" className="mb-3 text-lg font-medium">
                    Start
                  </label>
                  <input
                    type="date"
                    id="start"
                    className="mb-5 h-12 rounded-lg px-3 bg-gray-200 shadow"
                    name="startedAt"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="end"
                    className="mb-3 text-lg font-medium px-3 focus:bg-gray-300"
                  >
                    End
                  </label>
                  <input
                    type="date"
                    id="end"
                    className="mb-5 h-12 rounded-lg px-3 bg-gray-200 shadow focus:bg-gray-300"
                    name="endedAt"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button className="bg-[#fe4e30] h-10 mt-5 rounded-md text-white font-bold text-lg">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
