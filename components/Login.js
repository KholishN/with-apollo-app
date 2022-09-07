import React from "react";

export default function Login() {
  return (
    <div className="bg-gray-200 w-full h-screen flex justify-center items-center">
      <div className=" flex flex-col max-h-[500px] h-full justify-center w-full">
        <form className="max-w-[500px] h-full  w-full mx-auto bg-white p-8 px-8 rounded-lg">
          <h2 className="text-4xl font-bold text-center mb-6">SIGN IN</h2>
          <div className="flex flex-col py-2">
            <label className="text-lg font-medium">Email</label>
            <input
              className="rounded-lg h-12 bg-gray-200 mt-2 p-2 focus:border-blue-500 focus:bg-gray-300 focus:outline-none"
              type="email"
            />
          </div>
          <div className="flex flex-col pb-1 pt-6">
            <label className="text-lg font-medium">Password</label>
            <input
              className="rounded-lg h-12 bg-gray-200 mt-2 p-2 focus:border-blue-500 focus:bg-gray-300 focus:outline-none"
              type="password"
            />
          </div>
          <div className="flex justify-between pb-7 py-2">
            <p className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember Me
            </p>
            <p>Forgot Password</p>
          </div>
          <button className="w-full h-12 my-5 py-2 bg-[#fe4e30] shadow font-semibold rounded-md text-white ">
            Sign In
          </button>
          <div className="text-center text-lg">
            <p>
              Belum Punya Akun?{" "}
              <a className="text-[#fe4e30] font-semibold">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
