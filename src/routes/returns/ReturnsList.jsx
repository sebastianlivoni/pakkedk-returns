import { useEffect, useState } from "react"
import UpdateReturn from "../../components/UpdateReturn";
import '../../styles/returnslist.css'
import DeleteReturn from "../../components/DeleteReturn";
import { useNavigate } from "react-router-dom";
import images from '../../components/VectorImages'
import VectorImage from "../../images/vectors/vector0.png"
import { Link } from 'react-router-dom';

const statusMessage = [
    {message: "waiting to be send", colors: "bg-red-100 text-red-800 font-bold py-2 rounded-md px-2"},
    {message: "ready for pickup", colors: "bg-green-100 text-green-800 font-bold py-2 rounded-md px-2"},
    {message: "pickup booked", colors: "bg-violet-100 text-violet-800 font-bold py-2 rounded-md px-2"}
]

export default function ReturnsList({myprop}) {
    const [orders, setOrders] = useState([])
    let navigate = useNavigate();
    
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState([])
    const Toggle = () => setShowModal(!showModal);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteModalData, setDeleteModalData] = useState([])
    const DeleteToggle = () => setShowDeleteModal(!showDeleteModal);

    function fetchData() {
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
        if (myprop === "yourreturns") {
            fetch(`https://pakkedk-return.herokuapp.com/returns/findallown`, {
                method: "GET",
                headers: {
                "Content-type": "application/json",
                "x-access-token": localStorage.getItem("token")
                }
            })
            .then(res => res.json())
            .then(data => {
               setOrders(data)
            })
        } else {
            fetch("https://pakkedk-return.herokuapp.com/returns/find", {
                method: "GET",
                headers: {
                "Content-type": "application/json",
                "x-access-token": localStorage.getItem("token")
                }
            })
            .then(res => res.json())
            .then(data => {
                if (myprop === "readypickup") {
                    data = data.filter((entry) => {
                        return entry.status === 1;
                    })
                } else if (myprop === "allreturns") {
                    data = data.filter((entry) => {
                        return entry.status === 0;
                    })
                } else if (myprop === "returnssent") {
                    data = data.filter((entry) => {
                        return entry.status === 2;
                    })
                }
                setOrders(data)
            })
        }
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return(
    <div className="flex justify-center mt-6 bg-gray-100">
        <div className="col-span-12">
            <div className="overflow-auto lg:overflow-visible ">
                <table className="table text-black border-separate space-y-6 text-sm">
                    <thead className="bg-gray-800 text-gray-300">
                        <tr>
                            <th className="p-3">Creator</th>
                            <th className="p-3 text-left">Comments</th>
                            <th className="p-3 text-left">Old order</th>
                            <th className="p-3 text-left">New order</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length !== 0 ? 
                        orders.map((order) => (
                            <tr className="bg-white border-2" key={order._id}>
                                <td className="p-3">
                                    <div className="flex align-items-center">
                                        <img className="rounded-full h-12 w-12  object-cover" src={images[order.user.vectorimage]} alt="unsplash" />
                                        <div className="ml-3">
                                            <div className="">{order.user.name}</div>
                                            <div className="text-gray-500">{order.user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-3">
                                    {!order.comment ? "No comment..." : order.comment}
                                </td>
                                <td className="p-3 font-bold underline">
                                    <a href={"https://www.pakke.dk/UPSAdmin/orders_admin.php?oID=" + order.oldOrder} target="_blank" rel="noreferrer">{order.oldOrder}</a>
                                </td>
                                <td className="p-3 font-bold underline">
                                    <a href={"https://www.pakke.dk/UPSAdmin/orders_admin.php?oID=" + order.newOrder} target="_blank" rel="noreferrer">{order.newOrder}</a>
                                </td>
                                <td className="p-3">
                                    <span className={statusMessage[order.status].colors}>
                                        {statusMessage[order.status].message}
                                    </span>
                                </td>
                                <td className="p-3 ">
                                    <Link to={`/return/${order._id}`}>
                                        <span className="text-black mr-2 cursor-pointer">
                                            <i className="material-icons-outlined text-base">visibility</i>
                                        </span>
                                    </Link>
                                    {/*userID == order.user._id*/ true ?
                                        <span className="cursor-pointer" onClick={() => {Toggle(); setModalData({id: order._id, old: order.oldOrder, new: order.newOrder, status: order.status, comment: order.comment})}} >
                                            <i className="material-icons-outlined text-base cursor-pointer">edit</i>
                                        </span>
                                        :
                                        <span className="cursor-pointer">
                                            <i className="material-icons-outlined text-base text-red-800 cursor-not-allowed">edit</i>
                                        </span>
                                    }
                                    {/*<Link to={`/test/editreturn/${order._id}`} className="text-black hover:text-green-800 mx-2">
                                        <i className="material-icons-outlined text-base">edit</i>
                                    </Link>*/}
                                    {/*userID == order.user._id*/ true ?
                                        <span href="#" className="text-black hover:text-red-800 ml-2 cursor-pointer" onClick={() => {DeleteToggle(); setDeleteModalData({id: order._id, old: order.oldOrder, new: order.newOrder})}}>
                                            <i className="material-icons-round text-base">delete_outline</i>
                                        </span>
                                        :
                                        <span href="#" className="text-red-800 ml-2 cursor-not-allowed">
                                            <i className="material-icons-round text-base">delete_outline</i>
                                        </span>
                                    }
                                </td>
                            </tr>
                        ))
                        :
                        <span className="text-center absolute">There are no items right now in this category.</span>
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <UpdateReturn show={showModal} close={Toggle} data={modalData} fetchmydata={fetchData}/>
        <DeleteReturn show={showDeleteModal} close={DeleteToggle} data={deleteModalData} fetchmydata={fetchData}/>
    </div>
  )
}