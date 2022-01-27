import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'

const statusMessage = [
    {message: "waiting to be send", colors: "bg-red-100 text-red-800 font-bold py-2 rounded-md px-2"},
    {message: "ready to book pickup", colors: "bg-green-100 text-green-800 font-bold py-2 rounded-md px-2"},
    {message: "pickup booked", colors: "bg-violet-100 text-violet-800 font-bold py-2 rounded-md px-2"}
]

export default function Return(props) {

	const [history, setHistory] = useState([]);
	const [newOrder, setNewOrder] = useState(0);
	const [oldOrder, setOldOrder] = useState(0);
	const [comment, setComment] = useState("");
	const [status, setStatus] = useState(0);

	const { id } = useParams()

	const [isLoaded, setIsLoaded] = useState(false)

	function fetchData() {
		fetch(`https://pakkedk-return.herokuapp.com/returns/findone${id}`, {
            headers: {
              "x-access-token": localStorage.getItem("token")
            }
	    })
	    .then(res => res.json())
	    .then(data => {
	        setNewOrder(data.newOrder);
	        setOldOrder(data.oldOrder);
	        setComment(data.comment);
	        setStatus(data.status);
	        setHistory(data.history);
	        setIsLoaded(true)
	    })
	}

	useEffect(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
	 }, [])

	if (!isLoaded) {
		return <p className="text-center my-12 text-bold text-xl">Loading...</p>
	}

	const GoBackButton = () => {
		const navigate = useNavigate();

		return <button className="mb-6" onClick={() => navigate(-1)}>Click <span className="font-bold">here</span> to go back</button>
	}

	return (
		<div className="w-2/4 mx-auto mt-8">

			<GoBackButton />

			<h1>New order: {newOrder}</h1>
			<h1>Old order: {oldOrder}</h1>
			<h1>Comment: {comment}</h1>
			<h1>Status: {statusMessage[status].message}</h1>

			<h1 className="text-center text-lg font-bold my-8">History changes:</h1>
			<p className="text-center mb-4">Text marked in <span className="text-red-500 font-bold">red</span> is changes from the previous.</p>
			{history.map((order, i) => (
				<div key={order._id} className="my-4">
					<h1>New order: {i > 0 ? order.newOrder !== history[i - 1].newOrder ? <span className="text-red-500 font-bold">{order.newOrder}</span> : <span>{order.newOrder}</span> : order.newOrder}</h1>
					<h1>Old order: {i > 0 ? order.oldOrder !== history[i - 1].oldOrder ? <span className="text-red-500 font-bold">{order.oldOrder}</span> : <span>{order.oldOrder}</span> : order.oldOrder}</h1>
					<h1>Comment: {i > 0 ? order.comment !== history[i - 1].comment ? <span className="text-red-500 font-bold">{order.comment}</span> : <span>{order.comment}</span> : order.comment}</h1>
					<h1>Status: {i > 0 ? order.status !== history[i - 1].status ? <span className="text-red-500 font-bold">{statusMessage[order.status].message}</span> : <span>{statusMessage[order.status].message}</span> : statusMessage[order.status].message}</h1>
					<h1>Changed by: {order.userEdited.name}</h1>
				</div>

			))}
		</div>
	)
}