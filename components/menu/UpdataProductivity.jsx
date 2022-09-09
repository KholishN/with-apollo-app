import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { gql, useMutation } from "@apollo/client";

const UPDATE_PRODUCTIVITY = gql`
  mutation UpdateProductivity($input: UpdateProductivityInput!, $id: String!) {
    updateProductivity(input: $input, id: $id) {
      student {
        firstName
        email
      }
      point
    }
  }
`;

export default function UpdateProductivity({
  show,
  handleClose,
  setShow,
  productivity,
  userId,
  data,
}) {
  if (!show) return null;

  const [updateProductivity] = useMutation(UPDATE_PRODUCTIVITY);
  const [form, setForm] = useState({
    point: 0,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProductivity({
      variables: {
        input: {
          point: form.point,
        },
        id: data?.productivities[0]?.id,
      },
      refetchQueries: [
        {
          query: productivity,
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
      </div>
    </div>
  );
}
