import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { gql, useMutation } from "@apollo/client";

const UPDATE_ATTENDANCE = gql`
  mutation UpdateAttendence($input: UpdateAttendanceInput!, $id: String!) {
    updateAttendance(input: $input, id: $id) {
      student {
        firstName
        email
      }
      present
      sick
      permission
      absent
      id
    }
  }
`;

export default function UpdateAttendence({
  show,
  handleClose,
  setShow,
  attendence,
  userId,
  data,
}) {
  if (!show) return null;

  const [updateAttendance] = useMutation(UPDATE_ATTENDANCE);
  const [form, setForm] = useState({
    present: 0,
    sick: 0,
    permission: 0,
    absent: 0,
  });


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAttendance({
      variables: {
        input: {
          present: form.present,
          sick: form.sick,
          permission: form.permission,
          absent: form.absent,
        },
        id: data?.attendances[0]?.id,
      },
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

    setShow(false);
  };

  return (
    <div className="fixed pt-3 inset-0 bg-black  bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="flex justify-center">
        <div className=" w-97 bg-white rounded-lg shadow ">
          <div className="p-8">
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl font-semibold mb-7">Add Attendence</h1>
              <CgClose
                className="text-2xl font-extrabold cursor-pointer"
                onClick={handleClose}
              />
            </div>
            <form className="flex flex-col items-center justify-center ">
              <label htmlFor="name" className="mb-3 text-lg font-medium mt-2">
                Present
              </label>
              <div className="flex flex-row gap-x-4  justify-center">
                <div className="w-32 h-1 flex items-center">
                  <button
                    className="rounded-full bg-gray-200 text-3xl shadow-md "
                    onClick={(e) => {
                      e.preventDefault(),
                        setForm({
                          present: form.present - 1,
                          absent: form.absent,
                          permission: form.permission,
                          sick: form.sick,
                        });
                    }}
                  >
                    <AiOutlineMinus />
                  </button>
                </div>
                <input
                  type="number"
                  id="name"
                  className=" h-1 rounded-lg px-3 text-center bg-gray-200 shadow focus:bg-gray-300"
                  name="present"
                  onChange={handleChange}
                  value={form.present}
                />
                <div className="w-32 h-1 flex items-center">
                  <button
                    className="rounded-full bg-gray-200 text-3xl"
                    onClick={(e) => {
                      e.preventDefault(),
                        setForm({
                          present: form.present + 1,
                          absent: form.absent,
                          permission: form.permission,
                          sick: form.sick,
                        });
                    }}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>
              <label htmlFor="name" className="mb-3 text-lg font-medium mt-2">
                Absent
              </label>
              <div className="flex flex-row gap-x-4  justify-center">
                <div className="w-32 h-1 flex items-center">
                  <button
                    className="rounded-full bg-gray-200 text-3xl shadow-md"
                    onClick={(e) => {
                      e.preventDefault(),
                        setForm({
                          present: form.present,
                          absent: form.absent - 1,
                          permission: form.permission,
                          sick: form.sick,
                        });
                    }}
                  >
                    <AiOutlineMinus />
                  </button>
                </div>
                <input
                  type="number"
                  id="name"
                  className=" h-1 text-center rounded-lg px-3 bg-gray-200 shadow focus:bg-gray-300"
                  name="absent"
                  onChange={handleChange}
                  value={form.absent}
                />
                <div className="w-32 h-1 flex items-center">
                  <button
                    className="rounded-full bg-gray-200 text-3xl"
                    onClick={(e) => {
                      e.preventDefault(),
                        setForm({
                          present: form.present,
                          absent: form.absent + 1,
                          permission: form.permission,
                          sick: form.sick,
                        });
                    }}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>
              <label htmlFor="name" className="mb-3 text-lg font-medium mt-2">
                Permission
              </label>
              <div className="flex flex-row gap-x-4  justify-center">
                <div className="w-32 h-1 flex items-center">
                  <button
                    className="rounded-full bg-gray-200 text-3xl shadow-md"
                    onClick={(e) => {
                      e.preventDefault(),
                        setForm({
                          present: form.present,
                          absent: form.absent,
                          permission: form.permission - 1,
                          sick: form.sick,
                        });
                    }}
                  >
                    <AiOutlineMinus />
                  </button>
                </div>
                <input
                  type="number"
                  id="name"
                  className=" text-center h-1 rounded-lg px-3 bg-gray-200 shadow focus:bg-gray-300"
                  name="permission"
                  onChange={handleChange}
                  value={form.permission}
                />
                <div className="w-32 h-1 flex items-center">
                  <button
                    className="rounded-full bg-gray-200 text-3xl"
                    onClick={(e) => {
                      e.preventDefault(),
                        setForm({
                          present: form.present,
                          absent: form.absent,
                          permission: form.permission + 1,
                          sick: form.sick,
                        });
                    }}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>
              <label htmlFor="name" className="mb-3 text-lg font-medium mt-2">
                Sick
              </label>
              <div className="flex flex-row gap-x-4  justify-center mb-5">
                <div className="w-32 h-1 flex items-center">
                  <button
                    className="rounded-full bg-gray-200 text-3xl shadow-md"
                    onClick={(e) => {
                      e.preventDefault(),
                        setForm({
                          present: form.present,
                          absent: form.absent,
                          permission: form.permission,
                          sick: form.sick - 1,
                        });
                    }}
                  >
                    <AiOutlineMinus />
                  </button>
                </div>
                <input
                  type="number"
                  id="name"
                  className=" text-center h-1 rounded-lg px-3 bg-gray-200 shadow focus:bg-gray-300"
                  name="sick"
                  onChange={handleChange}
                  value={form.sick}
                />
                <div className="w-32 h-1 flex items-center">
                  <button
                    className="rounded-full bg-gray-200 text-3xl"
                    onClick={(e) => {
                      e.preventDefault(),
                        setForm({
                          present: form.present,
                          absent: form.absent,
                          permission: form.permission,
                          sick: form.sick + 1,
                        });
                    }}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-[#fe4e30] w-full h-12 mt-5 rounded-md text-white font-bold text-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
