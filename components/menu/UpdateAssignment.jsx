import { useState } from "react";
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

const GET_SUBJECT = gql`
  query GetSubject($where: SubjectFilter) {
    subjects(where: $where) {
      name
      subCategory {
        name
        category
        classType
        percentage
        id
      }
      percentage
      id
    }
  }
`;

const GET_CATEGORIES = gql`
  query GetCategories($where: SubCategoryFilter) {
    subCategories(where: $where) {
      id
      name
      category
      subjects {
        name
        percentage
        id
      }
    }
  }
`;

export default function UpdateAssignment({
  show,
  handleClose,
  setShow,
  asignment,
  userId,
  data,
}) {
  if (!show) return null;

  const { data: subject } = useQuery(GET_SUBJECT, {
    where: {
      subCategory: {
        classType: "STAGEONE",
      },
    },
  });

  const { data: categories } = useQuery(GET_CATEGORIES, {
    variables: {
      where: {
        classType: "STAGEONE",
      },
    },
  });

  const [getCategory, { data: newcategories }] = useLazyQuery(GET_CATEGORIES);

  const [result, setResult] = useState({
    category: null,
  });
  const [resultSubject, setSubject] = useState({
    subject: null,
  });

  const [updateAssignment] = useMutation(UPDATE_ASSIGNMENT);
  const [form, setForm] = useState({
    point: 0,
    studentId: userId,
    subjectId: "",
  });
  console.log(typeof form.point);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setResult({
      ...result,
      [e.target.name]: e.target.id,
    });
  };

  const handleSubject = (e) => {
    e.preventDefault();

    setResult({ category: e.target.name });

    getCategory({
      variables: {
        where: {
          name: e.target.name,
        },
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAssignment({
      variables: {
        input: {
          point: parseInt(form.point),
          studentId: userId,
          subjectId: form.subjectId
        },
        id: data?.assignments[0]?.id,
      },
      refetchQueries: [
        {
          query: asignment,
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
                  {result.category}
                </div>
                <div className="text-3xl">{resultSubject.subject}</div>
              </div>
            </div>
            <form className="flex flex-col items-center justify-between ">
              <div className="flex flex-row justify-between w-4/5">
                {categories?.subCategories?.map((item, index) => (
                  <div
                    className="flex flex-row
                  bg-[#fe4e30] px-4 py-2 rounded-lg text-white font-bold active:bg-[#c8351b]
                  justify-between"
                  >
                    <button
                      key={index}
                      onClick={handleSubject}
                      className="text-2xl"
                      name={item.name}
                    >
                      {item.name}
                    </button>
                  </div>
                ))}
              </div>
              <label htmlFor="name" className="mb-3 text-2xl font-bold mt-2">
                Point
              </label>
              <div className="flex flex-row gap-x-4  justify-center mb-5">
                <div className="w-32 h-1 flex items-center">
                  <button
                    className="rounded-full bg-gray-200 text-3xl shadow-md"
                    onClick={(e) => {
                      e.preventDefault(),
                        setForm({
                          point: form.point - 1,
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
                  value={form.point}
                />
                <div className="w-32 h-1 flex items-center">
                  <button
                    className="rounded-full bg-gray-200 text-3xl"
                    onClick={(e) => {
                      e.preventDefault(),
                        setForm({
                          point: form.point + 1,
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
        <div className=" w-97 bg-white rounded-lg shadow  ">
          <div className="p-8">
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl font-semibold mb-7">Add Assignment</h1>
              <CgClose
                className="text-2xl font-extrabold cursor-pointer"
                onClick={handleClose}
              />
            </div>
            <div>
              {newcategories?.subCategories && (
                <>
                  {newcategories?.subCategories.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 rounded-lg overflow-auto"
                    >
                      {item.subjects.map((data, idx) => (
                        <div
                          key={idx}
                          className="hover:bg-gray-200 cursor-pointer overflow-auto rounded-lg "
                          name="subjectId"
                          value="test"
                          id={data?.id}
                          onClick={() => (
                            setForm({ ...form, subjectId: data.id }),
                            setSubject({ ...subject, subject: data.name })
                          )}
                        >
                          <div className="w-full  mb-3 text-2xl p-2 rounded-lg overflow-auto">
                            <div>{data.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                  <div></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
