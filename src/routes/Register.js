import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from 'react'

export default function Register() {
  let navigate = useNavigate();
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  async function handleRegister(e) {
    e.preventDefault()

    if (password === confirmPassword) {
      const user = {
        name: name,
        email: email,
        password: password
      }

      fetch("/users/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(user)
      })
      .then(navigate("/login"))
    }
  }

  useEffect(() => {
    fetch("/users/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => data.isLoggedIn ? navigate("/home") : data)
  })

  return (
    <div className="mx-auto max-w-xs pt-40">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-lg text-center font-bold mb-5">Hi, please signup</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input onChange={e => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your full name" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input onChange={e => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Your email" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Type a strong password" />

          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_password">
            Confirm Password
          </label>
          <input onChange={e => setConfirmPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirm_password" type="password" placeholder="Type a strong password" />
        </div>
        <div className="flex items-center justify-between">
          <button onClick={handleRegister} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Register
          </button>
        </div>
        <p className="mt-7 text-xs text-center">Do you already have a account? <Link to="/login" className="text-blue-600 underline hover:text-blue-900 hover:font-semibold">Click here</Link></p>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2021 Sebastian Livoni. All rights reserved.
      </p>
    </div>
  )
}