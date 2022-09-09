import { gql, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

const Delete_Batch = gql`
  mutation ($id: String!) {
    deleteBatch(id: $id) {
      name
    }
  }
`;

export default function DeleteBatch({
  showDelete,
  handleCloseDelete,
  setShow,
  idBatch,
  batches,
}) {
  if (!showDelete) return null;
  const [deleteBatch] = useMutation(Delete_Batch);

  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const handleSubmit = () => {
    deleteBatch({
      variables: { id: idBatch },
      refetchQueries: [{ query: batches }],
    }).then((response) => console.log(response));
  };

  useEffect(() => {
    if (confirmDelete) {
      setShow(false);
      handleSubmit();
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <div className="fixed inset-0 bg-black  bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="flex justify-center">
        <div className=" w-97 bg-white rounded-lg shadow ">
          <div className="p-8">
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl font-semibold mb-7">Delete Batch</h1>
            </div>
            <div>Are You Sure Want To Delete This Batch ?</div>
            <div className=" py-2 mt-2   flex">
              <div className=" px-5">
                <button
                  className="bg-[#fe4e30] text-xl text-white px-8 py-2 rounded-md "
                  onClick={handleDelete}
                >
                  Yes
                </button>
              </div>
              <button
                className="bg-gray-200 text-xl px-8 py-2 rounded-md "
                type="submit"
                onClick={() => setShow(!showDelete)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
