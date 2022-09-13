import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";

const UPDATE_ASSIGNMENT = gql`
  mutation UpdateAssignment($input: UpdateAssignmentInput!, $id: String!) {
    updateAssignment(input: $input, id: $id) {
      student {
        firstName
        email
      }
      subject {
        name
        subCategory {
          name
          category
          percentage
        }
      }
      point
    }
  }
`;

const GET_ASSIGNMENT = gql`
  query getAssigment($id: String!) {
    assignment(id: $id) {
      subject {
        id
        name
        percentage
        subCategory {
          name
          category
        }
      }
      student {
        id
        firstName
      }
      point
      id
    }
  }
`;

export default function UpdateAssignment({
  show,
  handleClose,
  setShow,
  assignments,
  userId,
  data,
  idSubject,
  nameCategory,
  assignmentId,
}) {
  if (!show) return null;

  console.log(assignmentId);

  const { data: assigment } = useQuery(GET_ASSIGNMENT, {
    variables: {
      id: assignmentId,
    },
  });

  const [updateAssignment] = useMutation(UPDATE_ASSIGNMENT);
  const [form, setForm] = useState({
    point: assigment?.assignment?.point,
    studentId: userId,
    subjectId: idSubject,
    assignmentId: assignmentId,
  });

  useEffect(() => {
    if (assigment) {
      setForm({
        ...form,
        point: assigment?.assignment?.point,
        studentId: userId,
        subjectId: idSubject,
        assignmentId: assignmentId,
      });
    }
  }, [assigment]);

  console.log(assigment);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAssignment({
      variables: {
        input: {
          point: parseInt(form.point),
          studentId: userId,
          subjectId: form.subjectId,
        },
        id: form.assignmentId,
      },
      refetchQueries: [
        {
          query: assignments,
          variables: {
            where: {
              studentId: userId,
              subject: {
                subCategory: {
                  name: nameCategory,
                },
              },
            },
          },
        },
      ],
    });

    setShow(false);
  };

  return (
    <div className="fixed pt-3 inset-0 bg-black  bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="flex justify-center ">
        <div className=" w-97 bg-white rounded-lg shadow  ">
          <div className="p-8">
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl font-semibold mb-7">Add Assignment</h1>
              <CgClose
                className="text-2xl font-extrabold cursor-pointer"
                onClick={handleClose}
              />
            </div>
            <div className="bg-gray-200 w-[90%] h-[200px] mb-3 text-center p-5">
              <div className="">
                <div className="text-4xl font-bold mb-6 bg-gray-500 pb-3 w-4">
                  {assigment?.assignment?.subject?.subCategory?.name}
                </div>
                <div className="text-3xl">
                  {assigment?.assignment?.subject?.name}
                </div>
              </div>
            </div>
            <form className="flex flex-col w-4/5 justify-around my-5 ">
              <div className="flex  justify-between mx-2 "></div>
              <label
                htmlFor="name"
                className="mb-5 text-2xl text-center font-bold mt-2"
              >
                Point
              </label>
              <div className="flex flex-row gap-x-4  justify-center mb-5">
                <div className="w-32 h-1 flex items-center">
                  <button
                    className="rounded-full bg-gray-200 text-3xl shadow-md"
                    onClick={(e) => {
                      e.preventDefault(),
                        setForm({
                          point: form?.point - 1,
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
                  name="point"
                  onChange={handleChange}
                  value={form?.point}
                />
                <div className="w-32 h-1 flex items-center">
                  <button
                    className="rounded-full bg-gray-200 text-3xl"
                    onClick={(e) => {
                      e.preventDefault(),
                        setForm({
                          point: form?.point + 1,
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
