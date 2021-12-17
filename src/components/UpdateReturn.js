/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RefreshIcon } from '@heroicons/react/outline'

const statusMessage = [
  {key: 0, message: "waiting to be send"},
  {key: 1, message: "ready for pickup"},
  {key: 2, message: "pickup booked"}
]

const UpdateReturn = ({ show, close, data, fetchmydata }) => {
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState();

  const comment = useRef(null);
  const oldOrder = useRef(null);
  const newOrder = useRef(null);

  function handleUpdate(e) {
    e.preventDefault()

    const newData = {
      old: oldOrder.current.value,
      new: newOrder.current.value,
      status: status,
      comment: comment.current.value
    }

    fetch(`/returns/replace${data.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify(newData)
    })
    .then(() => {fetchmydata(); close()})
  }

  function handleDelete(e) {
    e.preventDefault()

    fetch(`/returns/delete${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(data => {
      window.location.reload(false)
    })
  }
  
  const cancelButtonRef = useRef(null)
  
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={close}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <RefreshIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Update return parcel
                    </Dialog.Title>
                    <div className="mt-2">
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Old order number
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            type="text"
                            name="price"
                            id="price"
                            className="block w-full pl-3 py-1 sm:text-sm border-gray-200 border rounded-md"
                            placeholder="Old order number"
                            defaultValue={data.old}
                            ref={oldOrder}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          New order number
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            type="text"
                            name="price"
                            id="price"
                            className="block w-full pl-3 py-1 sm:text-sm border-gray-200 border rounded-md"
                            placeholder="New order number"
                            defaultValue={data.new}
                            ref={newOrder}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Comment
                        </label>
                        <div className="mt-1 relative rounded-md">
                          <textarea ref={comment} rows="4" cols="30" className='pl-3 py-1 sm:text-sm border-gray-200 border rounded-md' defaultValue={data.comment}/>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                          Set status
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <select defaultValue={data.status} onChange={e => setStatus(e.target.value)}>
                          {statusMessage.map((option) => (
                            <option key={option.key} value={option.key}>{option.message}</option>
                          ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p>{message}</p>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={close}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default UpdateReturn