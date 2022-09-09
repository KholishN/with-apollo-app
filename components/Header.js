import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/logo.png";
import Button from "./Button";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import { useAuth } from '../lib/apolloClient'


export default function Header() {
 const {signOut} = useAuth()

  let [expand, setExpand] = useState(false);
  return (
    <div className="bg-neutral-500 shadow-md w-full z-10 fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white md:pr-24 py-2 md:px-10 px-7">
        <Link href="/batch" >
        <div className="cursor-pointer flex item-center md:pt-0 pt-3">
          <span>
            <Image src={Logo} alt="logo" width={50} height={40} />
          </span>
        </div>
        </Link>
        <div
          onClick={() => setExpand(!expand)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {expand ? <CgClose /> : <GiHamburgerMenu />}
        </div>
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            expand ? " opacity-100" : "top-[-490px] md:opacity-100 opacity-0"
          }`}
        >
              <li  className="md:ml-8 text-lg md:my-0 my-7 ">
              <a className="text-gray-800 font-bold hover:text-gray-400 duration-500" onClick={signOut} href="/"
              >
                Logout
              </a>
            </li>
        </ul>
      </div>
    </div>
  );
}
