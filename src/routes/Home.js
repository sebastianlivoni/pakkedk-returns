import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import Returns from '../components/Returns';

/* https://dev.to/salarc123/mern-stack-authentication-tutorial-part-2-the-frontend-gen */

export default function Home() {
  let navigate = useNavigate();
  
  useEffect(() => {
    fetch("https://pakkedk-return.herokuapp.com/users/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => data.isLoggedIn ? null : navigate("/login"))
  })

  return (
    <>
      <Navbar />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Returns />
        </div>
      </main>
    </>
  )
}