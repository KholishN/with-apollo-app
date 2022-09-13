import { gql, useQuery } from "@apollo/client";
import { GoCheck } from "react-icons/go";
import { HiOutlineInbox } from "react-icons/hi";

const SCORE_FACTORS = gql`
  query getScoreFactors($where: ScoreFactorFilter) {
    scoreFactors(where: $where) {
      classType
      category
      percentage
      id
    }
  }
`;

const SCORE_ATTENDANCE = gql`
  query getAttendence($where: AttendanceFilter) {
    attendances(where: $where) {
      id
      student {
        id
        firstName
      }
      present
      sick
      permission
      absent
    }
  }
`;

const SCORE_PRODUCTIVITY = gql`
  query getProductivity($where: ProductivityFilter) {
    productivities(where: $where) {
      student {
        id
        firstName
      }
      point
      id
    }
  }
`;

const SCORE_SOFTSKILL = gql`
  query getSoftSkill($where: SoftSkillFilter) {
    softSkills(where: $where) {
      student {
        id
        firstName
      }
      point
      id
    }
  }
`;

const SCORE_ASSIGNMENT = gql`
  query getAssigment($where: AssignmentFilter) {
    assignments(where: $where) {
      subject {
        id
        name
        percentage
        subCategory {
          name
          category
          percentage
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

export default function Report({ classTYPE, userId }) {
  // SCORE FACTOR
  const { data: scoreFactors } = useQuery(SCORE_FACTORS, {
    variables: {
      where: {
        classType: classTYPE,
      },
    },
  });

  // ATTENDANCE
  const { data: attendance } = useQuery(SCORE_ATTENDANCE, {
    variables: {
      where: {
        studentId: userId,
      },
    },
  });

  // PRODUCTIVITY
  const { data: productivity } = useQuery(SCORE_PRODUCTIVITY, {
    variables: {
      where: {
        studentId: userId,
      },
    },
  });

  // SOFTSKILL

  const { data: softskill } = useQuery(SCORE_SOFTSKILL, {
    variables: {
      where: {
        studentId: userId,
      },
    },
  });

  // ASSIGNMENT

  // STAGEONE

  const { data: chapterone } = useQuery(SCORE_ASSIGNMENT, {
    variables: {
      where: {
        studentId: userId,
        subject: {
          subCategory: {
            name: "Chapter 1",
          },
        },
      },
    },
  });

  const resultChapterOne = chapterone?.assignments?.reduce((total, num) => {
    return total + (((num.subject?.percentage * num?.point) / 100) * 40) / 100;
  }, 0);

  const { data: chaptertwo } = useQuery(SCORE_ASSIGNMENT, {
    variables: {
      where: {
        studentId: userId,
        subject: {
          subCategory: {
            name: "Chapter 2",
          },
        },
      },
    },
  });

  const resultChapterTwo = chaptertwo?.assignments?.reduce((total, num) => {
    return total + (((num.subject?.percentage * num?.point) / 100) * 60) / 100;
  }, 0);

  // console.log(resultChapterOne + (resultChapterTwo * 85) / 100);

  // STAGETWO
  const { data: frontend } = useQuery(SCORE_ASSIGNMENT, {
    variables: {
      where: {
        studentId: userId,
        subject: {
          subCategory: {
            name: "Frontend",
          },
        },
      },
    },
  });

  const resultFrontend = frontend?.assignments?.reduce((total, num) => {
    return total + (((num.subject?.percentage * num?.point) / 100) * 15) / 100;
  }, 0);

  const { data: backend } = useQuery(SCORE_ASSIGNMENT, {
    variables: {
      where: {
        studentId: userId,
        subject: {
          subCategory: {
            name: "Backend",
          },
        },
      },
    },
  });

  const resultBackend = frontend?.assignments?.reduce((total, num) => {
    return total + (((num.subject?.percentage * num?.point) / 100) * 15) / 100;
  }, 0);

  const { data: fullstack } = useQuery(SCORE_ASSIGNMENT, {
    variables: {
      where: {
        studentId: userId,
        subject: {
          subCategory: {
            name: "Fullstack",
          },
        },
      },
    },
  });

  const resultFullstack = fullstack?.assignments?.reduce((total, num) => {
    return total + (((num.subject?.percentage * num?.point) / 100) * 25) / 100;
  }, 0);

  const { data: additionalMaterial } = useQuery(SCORE_ASSIGNMENT, {
    variables: {
      where: {
        studentId: userId,
        subject: {
          subCategory: {
            name: "Additional Material",
          },
        },
      },
    },
  });

  const resultAdditionalMaterial = additionalMaterial?.assignments?.reduce(
    (total, num) => {
      return (
        total + (((num.subject?.percentage * num?.point) / 100) * 15) / 100
      );
    },
    0
  );

  const { data: finaltask } = useQuery(SCORE_ASSIGNMENT, {
    variables: {
      where: {
        studentId: userId,
        subject: {
          subCategory: {
            name: "Final Task",
          },
        },
      },
    },
  });

  const resultFinalTask = finaltask?.assignments?.reduce((total, num) => {
    return total + (((num.subject?.percentage * num?.point) / 100) * 30) / 100;
  }, 0);

  return (
    <div className="  min-h-screen flex flex-col p-28  w-full">
      <div className="w-4/5">
        <div className="flex flex-row justify-between pr-7">
          <h1 className="text-2xl font-semibold mb-5">Report</h1>
          <div className="flex flex-row"></div>
        </div>
        <div className=" overflow-auto rounded-lg shadow  md:block">
          <table className="w-full">
            <thead className="bg-gray-300 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-xl  font-semibold tracking-wide text-center">
                  {""}
                </th>
                <th className="w-20 p-3 text-xl  font-semibold tracking-wide text-center">
                  Attendance
                </th>

                <th className="w-20 p-3 text-xl  font-semibold tracking-wide text-center">
                  Productivity
                </th>

                <th
                  className={`w-20 p-3 text-xl  font-semibold tracking-wide text-center ${
                    classTYPE === "STAGEONE" && "hidden"
                  }`}
                >
                  Soft Skill
                </th>

                <th className="w-20 p-3 text-xl  font-semibold tracking-wide text-center">
                  Assignment
                </th>
              </tr>
            </thead>
            {
              <tbody className="divide-y  divide-gray-200">
                <tr className="bg-white hover:bg-gray-100 cursor-pointer">
                  <td className="p-3 text-lg text-gray-700 font-bold">Point</td>
                  <td className="p-3 text-lg text-gray-700 font-bold">
                    {(((attendance?.attendances[0]?.present / 18) * 10) / 100) *
                      100}
                  </td>
                  <td className="p-3 text-lg text-gray-700 font-bold">
                    {(((productivity?.productivities[0]?.point / 18) * 5) /
                      100) *
                      100}
                  </td>
                  <td
                    className={`p-3 text-lg text-gray-700 font-bold ${
                      classTYPE === "STAGEONE" && "hidden"
                    }`}
                  >
                    {(softskill?.softSkills[0]?.point * 10) / 100}
                  </td>
                  <td className="p-3 text-lg text-gray-700 font-bold">
                    {classTYPE === "STAGEONE"
                      ? resultChapterOne + (resultChapterTwo * 85) / 100
                      : resultFrontend +
                        resultBackend +
                        resultFullstack +
                        resultAdditionalMaterial +
                        (resultFinalTask * 75) / 100}
                  </td>
                </tr>

                <tr className="bg-white hover:bg-gray-100 cursor-pointer">
                  {" "}
                  <td className="p-3 text-lg text-gray-700 font-bold">
                    Percentage
                  </td>
                  {scoreFactors?.scoreFactors?.map((item, index) => (
                    <td
                      key={index}
                      className="p-3 text-center text-lg text-gray-700 font-bold"
                    >
                      {item?.percentage}%
                    </td>
                  ))}
                </tr>
              </tbody>

              // <tbody className="divide-y  divide-gray-200">
              //   <tr className="bg-white  ">
              //     <td
              //       colSpan={5}
              //       className=" p-3 h-40 text-lg text-gray-700 font-bold text-center"
              //     >
              //       <div className="flex justify-center ">
              //         <HiOutlineInbox className="w-12 h-12 opacity-25" />
              //       </div>{" "}
              //       <span>No Data</span>
              //     </td>
              //   </tr>
              // </tbody>
            }
          </table>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          <div
            className="bg-white hover:bg-gray-100 p-4 pr-16 sm:pr-7 rounded-lg shadow"
            key="{index}"
          >
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col item-center space-x-2 text-sm">
                <div className="font-semibold text-2xl">a</div>
                <div className="text-lg">Start : b</div>
                <div className="text-lg">End : c</div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="{item.id}"
                  className="cursor-pointer flex justify-center items-center"
                >
                  <input
                    type="checkbox"
                    defaultChecked=""
                    id="{item.id}"
                    className="appearance-none h-12 w-12 rounded-full border-2 border-none check-box"
                  />
                  <GoCheck className="text-3xl absolute opacity-0 check-1 transition" />
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* nodata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          <div
            className="bg-white hover:bg-gray-100 p-4 pr-16 sm:pr-7 rounded-lg shadow"
            key="{index}"
          >
            <div className="flex flex-row justify-between items-center">
              <div>
                <HiOutlineInbox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
