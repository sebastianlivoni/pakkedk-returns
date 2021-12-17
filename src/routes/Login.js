import { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  let navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault()

    const user = {
      email: email,
      password: password
    }

    fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("token", data.token)
      navigate("/")
    })
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
    <div className="mx-auto max-w-xs pt-56">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-lg text-center font-bold mb-5">Hi, please login</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input onChange={e => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
        </div>
        <div className="flex items-center justify-between">
          <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign In
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a>
        </div>
        <p className="mt-7 text-xs text-center">Don't you have an account? <Link to="/register" className="text-blue-600 underline hover:text-blue-900 hover:font-semibold">Click here</Link></p>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2021 Sebastian Livoni. All rights reserved.
      </p>
    </div>
  )
}