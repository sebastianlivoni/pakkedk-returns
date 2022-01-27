import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import images from '../components/VectorImages'

export default function EditAccount() {
  const [defaultName, setDefaultName] = useState("");
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [vectorImage, setVectorImage] = useState(0)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  let navigate = useNavigate();

  function fetchData() {
    fetch("https://pakkedk-return.herokuapp.com/users/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
      .then(res => res.json())
      .then(data => {
        setName(data.name)
        setEmail(data.email)
        setDefaultName(data.name)
        setVectorImage(data.vectorimage)
      })
    }

  useEffect(() => {
    fetchData();
  }, [])

  function handleUpdate(e) {
    e.preventDefault()

    if (password) {
      if (confirmPassword !== password) {
        setMessage("Please type identical passwords!")
        return null;
      }
    }


    const profileSettings = {
      name: name,
      email: email,
      password: password,
      vectorimage: vectorImage,
    }

    fetch(`https://pakkedk-return.herokuapp.com/users/updatesettings`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify(profileSettings)
    })
    .then(res => res.json())
    .then((data) => {
      localStorage.removeItem("token")
      navigate("/login")
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <div className="mx-auto mt-12 text-center">
        <h1 className="font-bold text-xl">Hi {defaultName}. Edit your account here</h1>
        <p><span className="text-fuchsia-600 font-black">!!!</span> When you click on the button "Update profile" you will automatically be logged out.</p>
      </div>

      <div className="max-w-xl mx-auto">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-12 sm:col-span-12">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Your full name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm p-3 border-gray-300 rounded-md"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>

                  <div className="col-span-12 sm:col-span-12">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Your email
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 shadow-sm border-gray-300 rounded-md"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="col-span-12 sm:col-span-12">
                    <p className="italic mb-4">Only type in the following input if you want to change your password.</p>
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 shadow-sm border-gray-300 rounded-md"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="col-span-12 sm:col-span-12">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-3 shadow-sm border-gray-300 rounded-md"
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                    {message}
                  </div>
                  <div className="col-span-12 sm:col-span-12">
                    <div className="flex">
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label inline-block mb-2">You want a custom profile picture just like seb's, right?<br /> Pick a image to compete in the battle of having the coolest profile picture.<h1 className="font-black">Please choose one of the following image which best describes you! :D</h1></label>
                        {/*<input class="" type="file" id="formFile" />*/}
                        <div className="flex flex-wrap">
                          {images.map((item, i) => (
                            (i === vectorImage) ? 
                            <img onClick={() => setVectorImage(i)} src={item} key={i} alt="custom alt vector" className="w-24 m-1 rounded-full border border-4 border-transparent border-red-500 cursor-pointer" />  
                            :
                            <img onClick={() => setVectorImage(i)} src={item} key={i} alt="custom alt vector" className="w-24 m-1 rounded-full border border-4 border-transparent hover:border-red-500 cursor-pointer"/>  
                          ))}
                        </div>    
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 text-right sm:px-6">
                <button
                  onClick={handleUpdate}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update profile
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}