import { gql, useMutation } from "@apollo/client";

const CREAETE_ATTENDANCE = gql`
  mutation ($input: CreateAttendanceInput!) {
    createAttendance(input: $input) {
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
export default function CreateAttedance({ attendence, userId }) {
  const [createAttendance] = useMutation(CREAETE_ATTENDANCE);

  const handleSubmit = (e) => {
    e.preventDefault();
    createAttendance({
      variables: {
        input: {
          studentId: userId,
          present: 0,
          sick: 0,
          permission: 0,
          absent: 0,
        },
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
  };

  return (
    <div className="bg-gray-200 w-full h-screen flex justify-center items-center">
      <div className=" flex flex-col max-h-[200px] h-full justify-center w-full">
        <div className="max-w-[500px] h-full  w-full mx-auto bg-white p-8 px-8 rounded-lg">
          <h2 className="text-4xl font-bold text-center mb-6">Add Attedance</h2>
          <button
            type="submit"
            className="w-full text-xl font-bold h-12 my-5 py-2 bg-[#fe4e30] shadow  rounded-md text-white"
            onClick={handleSubmit}
          >
            Create Attedance
          </button>
        </div>
      </div>
    </div>
  );
}
