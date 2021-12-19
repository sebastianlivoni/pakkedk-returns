import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import SideBar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Container() {
  let navigate = useNavigate();
  const [userID, setUserID] = useState("");

  useEffect(() => {
    fetch("https://pakkedk-return.herokuapp.com/users/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.isLoggedIn == false) {
        navigate("/login");
      } else {
        setUserID(data.id)
      }
    })
  })

  return (
    <>
      <div className="main flex bg-gray-100">
        <SideBar />
        <div className="w-full">
          <Navbar />

          <p className="text-center mt-10"><span className="text-rose-500 font-bold">Remember!</span> You can use CTRL + F to search for a return instead of scrolling</p>

          <Outlet />
        </div>
      </div>
    </>
  )

}