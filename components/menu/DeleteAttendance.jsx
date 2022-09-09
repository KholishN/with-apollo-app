import { gql, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

const Delete_Attendance = gql`
  mutation ($id: String!) {
    deleteAttendance(id: $id) {
      student {
        firstName
      }
    }
  }
`;

export default function DeleteAttendance({
  show,
  setShow,
  attendence,
  data,
  userId,
}) {
  if (!show) return null;
  const [deleteAttendance] = useMutation(Delete_Attendance);

  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  const handleSubmit = () => {
    deleteAttendance({
      variables: { id: data?.attendances[0]?.id },
      refetchQueries: [
        {
          query: attendence,
          variables: {
            where: {
              studentId: userId,
            },
          },
        },
      ],
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
              <h1 className="text-3xl font-semibold mb-7">Delete Attendance</h1>
            </div>
            <div>Are You Sure Want To Delete This Attendance ?</div>
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
              onClick={() => setShow(!show)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
