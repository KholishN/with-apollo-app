import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useAuth } from "../lib/apolloClient";
import { useRouter } from "next/router";

const POST_CLASSES = gql`
  mutation ($inputs: [CreateClassInput]!) {
    createClasses(inputs: $inputs) {
      results {
        batch {
          name
        }
        type
        students {
          firstName
        }
      }
    }
  }
`;

export default function CreateClass({ classes }) {
  const [createClasses] = useMutation(POST_CLASSES);

  const router = useRouter();
  const id = router.query.id;
  const handleSubmit = (e) => {
    e.preventDefault();
    createClasses({
      variables: {
        inputs: [
          {
            batchId: id,
            type: "STAGEONE",
          },
          {
            batchId: id,
            type: "STAGETWO",
          },
        ],
      },
      refetchQueries: [
        {
          query: classes,
          variables: {
            where: {
              batch: {
                id,
              },
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
            Create Classes
          </h2>
          <button
            type="submit"
            className="w-full text-xl font-bold h-12 my-5 py-2 bg-[#fe4e30] shadow  rounded-md text-white"
            onClick={handleSubmit}
          >
            Create Classes
          </button>
        </div>
      </div>
    </div>
  );
}
