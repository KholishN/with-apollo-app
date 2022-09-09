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

export default function Sidebars({
  setShowClass,
  classes,
  data,
  datas,
  setType,
  handleShowDeleteUser,
  setUserIdDelete
}) {
  // menu
  const [open, setOpen] = useState(true);
  const menus = [
    {
      title: "Student",
      src: <HiUsers className="w-[30px] h-[30px]" />,
      gap: true,
      menu: <TableUsers />,
    },
    {
      title: "Attendance",
      src: <HiOutlineClipboardCheck className="w-[30px] h-[30px]" />,
      gap: true,
      menu: <Attendence />,
    },
    {
      title: "Productivity",
      src: <FaAngleDoubleUp className="w-[30px] h-[30px]" />,
      gap: true,
      menu: <Productivity />,
    },
    {
      title: "Soft Skill",
      src: <FaChalkboardTeacher className="w-[30px] h-[30px]" />,
      gap: true,
      menu: <SoftSkill />,
    },
    {
      title: "Assignment",
      src: <TbReportAnalytics className="w-[30px] h-[30px]" />,
      gap: true,
      menu: <Assigment />,
    },
    {
      title: "Report",
      src: <TbReport className="w-[30px] h-[30px]" />,
      gap: true,
      menu: <Report />,
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

              <ul className="pt-6">
                {menus.map((item, index) => (
                  <li
                    key={index}
                    className={`mt-6 text-lg flex flex-row item-center gap-x-4 hover:bg-gray-200 rounded-md cursor-pointer ${
                      open ? "p-2 m-2" : "p-0 m-0"
                    }`}
                    onClick={() => setMenu(item.title)}
                  >
                    <span>{item.src}</span>
                    <span
                      className={`flex items-center origin-left duration-200 ${
                        !open && "hidden"
                      }`}
                    >
                      {item.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {datas === undefined ? (
            <Select />
          ) : menu === "Report" ? (
            <Report userId={userId} />
          ) : menu === "Attendance" ? (
            <Attendence userId={userId} />
          ) : menu === "Productivity" ? (
            <Productivity userId={userId} />
          ) : menu === "Soft Skill" ? (
            <SoftSkill userId={userId} />
          ) : menu === "Assignment" ? (
            <Assigment userId={userId} />
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
