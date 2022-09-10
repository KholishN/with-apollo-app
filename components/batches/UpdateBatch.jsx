import { CgClose } from "react-icons/cg";
import { useState, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
const update_batch = gql`
  mutation ($input: UpdateBatchInput!, $id: String!) {
    updateBatch(input: $input, id: $id) {
      id
      name
      startedAt
      endedAt
    }
  }
`;

const get_batch = gql`
  query getBatch($where: BatchFilter) {
    batches(where: $where) {
      name
      startedAt
      endedAt
    }
  }
`;
export default function UpdateBatch({
  show,
  handleClose,
  setShowUpdate,
  idBatch,
}) {
  if (!show) return null;
  const [updateBatch] = useMutation(update_batch);
  const { data, error, loading } = useQuery(get_batch, {
    variables: {
      where: {
        id: idBatch,
      },
    },
  });

  const [form, setForm] = useState({
    name: "",
    startedAt: "",
    endedAt: "",
  });


  useEffect(() => {
    if (data) {
      setForm({
        ...form,
        name: data?.batches[0].name,
        startedAt: data?.batches[0].startedAt.substr(0, 10),
        endedAt: data?.batches[0].endedAt.substr(0, 10),
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBatch({
      variables: {
        input: {
          name: form.name,
          startedAt: form.startedAt,
          endedAt: form.endedAt,
        },
        id: idBatch,
      },
    })

    setShowUpdate(false);
  };
  return (
    <div className="fixed inset-0 bg-black  bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="flex justify-center">
        <div className=" w-97 bg-white rounded-lg shadow ">
          <div className="p-8">
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl font-semibold mb-7">Update Batch</h1>
              <CgClose
                className="text-2xl font-extrabold cursor-pointer"
                onClick={handleClose}
              />
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <label htmlFor="name" className="mb-3 text-lg font-medium">
                Batch Name
              </label>
              <input
                type="text"
                id="name"
                className="mb-5 h-12 rounded-lg px-3 bg-gray-200 shadow focus:bg-gray-300"
                name="name"
                value={form.name}
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
                    value={form.startedAt}
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
                    value={form.endedAt}
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
