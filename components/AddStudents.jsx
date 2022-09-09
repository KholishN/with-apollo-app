import { CgClose } from "react-icons/cg";
import { GoCheck } from "react-icons/go";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const GET_STUDENT = gql`
  query GetUserByRole($where: UserFilter) {
    users(where: $where) {
      id
      firstName
      email
      role
    }
  }
`;

const ADD_USER = gql`
  mutation UpdateClass($input: UpdateClassInput!, $id: String!) {
    updateClass(input: $input, id: $id) {
      id
      students {
        firstName
        email
      }
    }
  }
`;

export default function AddStudents({
  showClass,
  setShowClass,
  classes,
  ClassID,
  type,
  datas,
}) {
  if (!showClass) return null;
  const [addStudents] = useMutation(ADD_USER);
  const { data, error, loading } = useQuery(GET_STUDENT, {
    variables: {
      where: {
        role: "STUDENT",
      },
    },
  });

  // student
  const [userName, setUsername] = useState([]); //price
  const [userId, setUserId] = useState([]); //id

  // check mark
  const handleChange = (e) => {
    let users = [...userName];
    if (e.target.checked) {
      users = [...userName, e.target.value];
    } else {
      users.splice(userName.indexOf(e.target.value));
    }
    setUsername(users);

    let user_id = [...userId];
    if (e.target.checked) {
      user_id = [...userId, e.target.id];
    } else {
      user_id.splice(userId.indexOf(e.target.id));
    }

    setUserId(user_id);
  };

  const router = useRouter();
  const id = router.query.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudents({
      variables: {
        input: {
          studentsIds: userId,
        },
        id: ClassID,
      },
      refetchQueries: [
        {
          query: classes,
          variables: {
            where: {
              batch: {
                id,
              },
              type,
            },
          },
        },
      ],
    }).then((response) => console.log(response));
  };
  return (
    <div className="fixed inset-0 bg-black  bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div className="flex justify-center">
        <div className=" w-97 bg-white rounded-lg shadow ">
          <div className="p-8">
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl font-semibold mb-7">Students</h1>
              <CgClose
                className="text-2xl font-extrabold cursor-pointer"
                onClick={() => setShowClass(false)}
              />
            </div>

            <div className="bg-gray-50 grid grid-cols-4 gap-y-4 h-[100px] mb-5 overflow-auto p-5 rounded-lg">
              {userName.map((item, index) => (
                <div className="">
                  <div
                    key={index}
                    className="bg-gray-200 w-[86px] text-center rounded-lg"
                  >
                    <div>{item}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full h-[200px] overflow-auto bg-gray-50 rounded-lg p-2">
              {data?.users.map((item, index) => (
                <label
                  htmlFor={item.id}
                  className="cursor-pointer w-full justify-center  items-center  "
                  key={index}
                >
                  <div className="flex flex-row pr-7 justify-between h-14  hover:bg-gray-200 rounded-lg mb-2 px-4">
                    <div className="text-xl flex justify-center items-center">
                      {item.firstName}
                    </div>
                    <div className="flex items-center px-2">
                      <input
                        type="checkbox"
                        id={item.id}
                        className="appearance-none h-8 w-8 check-box"
                        name={item.firstName}
                        value={item.firstName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <div className=" mt-8">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-[#fe4e30] w-full h-12 rounded-lg text-white text-xl font-bold active:bg-[#f34425] shadow"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
