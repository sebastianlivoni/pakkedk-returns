import { SearchIcon, BellIcon } from '@heroicons/react/outline'
import { useNavigate, Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function Navbar() {
  let navigate = useNavigate();

  function Logout() {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <>
      <div className="bg-white h-24 w-full flex flex-row">
        <div className="basis-7/12 mx-6 my-auto">
          <div className="absolute items-center pointer-events-none mt-2.5">
            <SearchIcon className="h-6 w-6" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            className="block pl-10 py-2 text-lg pr-12 border-gray-300 rounded-md"
            placeholder="Search"
          />
        </div>
        <div className="basis-8/12 my-auto">
          <nav className="float-right mr-8">
            <ul className="flex space-x-8 leading-6 font-semibold text-gray-700">
              <li><span className="align-middle line-through cursor-not-allowed">Inbox</span></li>
              <li><Link to="/reportabug" className="align-middle">Report a bug & FAQ</Link></li>
              <li><BellIcon className="w-6 h-6 mt-0.5"/></li>
              <li><span>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button>
                    <img className="h-8 w-8 rounded-full" src="https://avatars.githubusercontent.com/u/29739749?v=4" alt=""/>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-24 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={Logout}
                              className={`${
                                active ? 'bg-violet-300 text-white' : 'text-gray-900'
                              } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </span></li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}