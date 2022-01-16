import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import SideBar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Container() {
  let navigate = useNavigate();

  useEffect(() => {
    fetch("https://pakkedk-return.herokuapp.com/users/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.isLoggedIn === false) {
        navigate("/login");
      }
    })
  })

  return (
    <>
      <div className="h-screen flex bg-gray-100">
        <div className="w-36 overflow-y-scroll relative bg-slate-800">
          <SideBar />
        </div>
        <div className="flex-1 flex">
          <div className="flex-1 overflow-y-scroll">
            <Navbar />

            <p className="text-center mt-10"><span className="text-rose-500 font-bold">Remember!</span> You can use CTRL + F to search for a return instead of scrolling</p>


            <Outlet />
          </div>
        </div>
      </div>
    </>
  )

}