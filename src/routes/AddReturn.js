import Navbar from "../components/Navbar";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function AddReturn() {
  const [oldOrder, setOldOrder] = useState();
  const [newOrder, setNewOrder] = useState();
  const [message, setMessage] = useState();
  let navigate = useNavigate();

  function handleReturn(e) {
    e.preventDefault()

    if (oldOrder && newOrder) {

      const order = {
        oldOrder: oldOrder,
        newOrder: newOrder
      }

      fetch(`/returns/add`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "x-access-token": localStorage.getItem("token")
        },
        body: JSON.stringify(order)
      })
      .then(res => res.json())
      .then(data => {
        setMessage("Success: You created a new return parcel.")
        navigate("/home")
      })
    } else {
      setMessage("Please type in both input fields!")
    }
  }


  return (
    <>
      <Navbar />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Add a return parcel</h1>
        </div>
      </header>
      <main>
        <div className="max-w-sm mx-auto py-6 sm:px-6 lg:px-8">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Original Order number
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="price"
                id="price"
                className="pl-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-1 pr-12 sm:text-sm border-gray-300 border-2 rounded-md"
                placeholder="Original Order Number"
                onChange={e => setOldOrder(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              New return order number
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="price"
                id="price"
                className="pl-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full py-1 pr-12 sm:text-sm border-gray-300 border-2 rounded-md"
                placeholder="New return order number"
                onChange={e => setNewOrder(e.target.value)}
              />
            </div>
          </div>
          <button onClick={handleReturn} className="text-sm bg-indigo-500 text-white py-2 px-3 rounded mt-3 hover:bg-indigo-600">Create return</button>
          <p>{message}</p>
        </div>
      </main>
    </>
  )
}
