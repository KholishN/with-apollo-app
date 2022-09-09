import { gql, useMutation } from "@apollo/client";

const CREAETE_ASSIGNMENT = gql`
  mutation ($input: CreateAssignmentInput!) {
    createAssignment(input: $input) {
      student {
        firstName
        email
      }
      id
      subject {
        id
        name
      }
      point
    }
  }
`;
export default function CreateAssigment({ assignments, userId }) {
  const [createAssignment] = useMutation(CREAETE_ASSIGNMENT);

  const handleSubmit = (e) => {
    e.preventDefault();
    createAssignment({
      variables: {
        input: {
          studentId: userId,
        },
      },
      refetchQueries: [
        {
          query: assignments,
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
          <h2 className="text-4xl font-bold text-center mb-6">
            Create Assigment
          </h2>
          <button
            type="submit"
            className="w-full text-xl font-bold h-12 my-5 py-2 bg-[#fe4e30] shadow  rounded-md text-white"
            onClick={handleSubmit}
          >
            Create Assigment
          </button>
        </div>
      </div>
    </div>
  );
}
