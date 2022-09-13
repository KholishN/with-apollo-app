import { gql, useQuery } from "@apollo/client";
import { FiChevronLeft } from "react-icons/fi";
import { HiOutlineClipboardCheck, HiUsers } from "react-icons/hi";
import { FaAngleDoubleUp, FaChalkboardTeacher } from "react-icons/fa";
import { TbReportAnalytics, TbReport } from "react-icons/tb";
import { useState } from "react";
import Photo from "../assets/blank-profile.png";
import Image from "next/image";

// menus
import TableUsers from "./menu/TableUsers";
import Assigment from "./menu/Assigment";
import Attendence from "./menu/Attendence";
import Productivity from "./menu/Productivity";
import Report from "./menu/Report";
import SoftSkill from "./menu/SoftSkill";
import Select from "./menu/Select";

import CreateClass from "./CreateClass";
import CreateAssigment from "./menu/CreateAssigment";

const assignments = gql`
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

export default function Sidebars({
  setShowClass,
  classes,
  data,
  datas,
  setType,
  handleShowDeleteUser,
  setUserIdDelete,
  classTYPE,
  setIdSubject,
  idSubject,
  setNameCategory,
  nameCategory,
  setAssignmentId,
  assignmentId,
}) {
  // menu
  const [open, setOpen] = useState(true);
  const menus = [
    {
      title: "Student",
      src: <HiUsers className="w-[30px] h-[30px]" />,
      gap: true,
      menu: <TableUsers />,
      stage: "STAGE1",
    },
    {
      title: "Attendance",
      src: <HiOutlineClipboardCheck className="w-[30px] h-[30px]" />,
      gap: true,
      menu: <Attendence />,
      stage: "STAGE1",
    },
    {
      title: "Productivity",
      src: <FaAngleDoubleUp className="w-[30px] h-[30px]" />,
      gap: true,
      menu: <Productivity />,
      stage: "STAGE1",
    },
    {
      title: "Soft Skill",
      src: <FaChalkboardTeacher className="w-[30px] h-[30px]" />,
      gap: true,
      menu: <SoftSkill />,
      stage: "STAGEONE",
    },
    {
      title: "Assignment",
      src: <TbReportAnalytics className="w-[30px] h-[30px]" />,
      gap: "Create Assigment",
      menu: <Assigment />,
      stage: "STAGE1",
    },
    {
      title: "Report",
      src: <TbReport className="w-[30px] h-[30px]" />,
      gap: true,
      menu: <Report />,
      stage: "STAGE1",
    },
  ];
  const [menu, setMenu] = useState("");

  // get user id
  const [userId, setUserId] = useState("");
  return (
    <>
      {data?.classes.length !== 0 ? (
        <div className="flex">
          <div
            className={`${
              open ? "w-80 pt-20" : "w-20 pt-36"
            } duration-300  min-h-screen  p-5  bg-gray-100 relative`}
          >
            <FiChevronLeft
              onClick={() => setOpen(!open)}
              className={`absolute cursor-pointer -right-5 top-[5rem] border-2 bordred bg-gray-100 text-5xl rounded-full ${
                !open && "rotate-180"
              } duration-500`}
            />

            <div className="flex flex-row gap-x-4 item-center pt-3">
              <div
                className={`cursor-pointer duration-500 w-[40px] h-[40px] rounded-full ${
                  !open && "absolute "
                }`}
              >
                <Image src={Photo} width={60} height={60} className="roudedd" />
              </div>
              <div
                className={` origin-left font-medium text-xl duraion 300 ${
                  !open && "scale-0"
                }`}
              >
                <h1>test</h1>
              </div>
            </div>
            <div className={`pt-10  ${!open && "pt-0"}`}>
              <select
                className={`w-full h-10 bg-gray-300 rounded-lg px-3 ${
                  !open && "scale-0"
                }`}
                onChange={(e) => setType(e.target.value)}
              >
                <option>Select Stage</option>
                {data?.classes?.map((stage, index) => (
                  <option key={index} value={stage.type}>
                    {stage.type}
                  </option>
                ))}
              </select>
              {userId && (
                <ul className="pt-6">
                  {menus
                    .filter((x) => x.stage !== datas?.classes[0]?.type)
                    .map((item, index) => (
                      <li>
                        {" "}
                        <li
                          key={index}
                          className={`mt-6 text-lg flex flex-row item-center gap-x-4 hover:bg-gray-200 rounded-md cursor-pointer ${
                            open ? "p-2 m-2" : "p-0 m-0"
                          }`}
                          onClick={() => setMenu(item.title)}
                        >
                          {item.title === "Assignment" ? (
                            <div className="flex flex-col">
                              <div className="flex flex-row mb-3">
                                <span>{item.src}</span>
                                <span
                                  className={`flex ml-4 items-center origin-left duration-200 ${
                                    !open && "hidden"
                                  }`}
                                >
                                  {item.title}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <span>{item.src}</span>
                              <span
                                className={`flex items-center origin-left duration-200 ${
                                  !open && "hidden"
                                }`}
                              >
                                {item.title}
                              </span>
                            </>
                          )}
                        </li>
                        <li
                          onClick={() => setMenu("Creaete Assignment")}
                          className={`flex ml-4 items-center hover:bg-white ${
                            menu === "Assignment" ? "" : "hidden"
                          } origin-left duration-200 ${!open && "hidden"}`}
                        >
                          {item.gap}
                        </li>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
          {datas === undefined ? (
            <Select />
          ) : menu === "Report" ? (
            <Report userId={userId} classTYPE={classTYPE}/>
          ) : menu === "Attendance" ? (
            <Attendence userId={userId} />
          ) : menu === "Productivity" ? (
            <Productivity userId={userId} />
          ) : menu === "Soft Skill" ? (
            <SoftSkill userId={userId} />
          ) : menu === "Assignment" ? (
            <Assigment
              userId={userId}
              classTYPE={classTYPE}
              assignments={assignments}
              setIdSubject={setIdSubject}
              idSubject={idSubject}
              setNameCategory={setNameCategory}
              nameCategory={nameCategory}
              setAssignmentId={setAssignmentId}
              assignmentId={assignmentId}
            />
          ) : menu === "Creaete Assignment" ? (
            <CreateAssigment
              userId={userId}
              classTYPE={classTYPE}
              assignments={assignments}
            />
          ) : (
            <TableUsers
              userId={userId}
              setUserId={setUserId}
              students={datas}
              setShowClass={setShowClass}
              classes={classes}
              handleShowDeleteUser={handleShowDeleteUser}
              setUserIdDelete={setUserIdDelete}
            />
          )}
        </div>
      ) : (
        <CreateClass classes={classes} />
      )}
    </>
  );
}
