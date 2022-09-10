import { gql, useMutation } from "@apollo/client";

const CREAETE_SOFTSKILL = gql`
  mutation ($input: CreateSoftSkillInput!) {
    createSoftSkill(input: $input) {
      student {
        firstName
        email
      }
      point
    }
  }
`;
export default function CreateSoftSkill({ userId, softSkill }) {
  const [createSoftSkill] = useMutation(CREAETE_SOFTSKILL);

  const handleSubmit = (e) => {
    e.preventDefault();
    createSoftSkill({
      variables: {
        input: {
          studentId: userId,
          point: 0,
        },
      },
      refetchQueries: [
        {
          query: softSkill,
          variables: {
            where: {
              studentId: userId,
            },
          },
        },
      ],
    })
  };
  return (
    <div className="bg-gray-200 w-full h-screen flex justify-center items-center">
      <div className=" flex flex-col max-h-[200px] h-full justify-center w-full">
        <div className="max-w-[500px] h-full  w-full mx-auto bg-white p-8 px-8 rounded-lg">
          <h2 className="text-4xl font-bold text-center mb-6">
            Create Soft Skill
          </h2>
          <button
            type="submit"
            className="w-full text-xl font-bold h-12 my-5 py-2 bg-[#fe4e30] shadow  rounded-md text-white"
            onClick={handleSubmit}
          >
            Create Soft Skill
          </button>
        </div>
      </div>
    </div>
  );
}
