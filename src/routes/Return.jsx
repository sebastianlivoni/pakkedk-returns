import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

export default function Return(props) {

	const [history, setHistory] = useState([]);
	const [newOrder, setNewOrder] = useState(0);
	const [oldOrder, setOldOrder] = useState(0);
	const [comment, setComment] = useState("");

	const { id } = useParams()

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
	        setHistory(data.history);
	    })
	}

	useEffect(() => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
	 }, [])

	return (
		<div className="w-2/4 mx-auto mt-8">
			<h1>New order: {newOrder}</h1>
			<h1>Old order: {oldOrder}</h1>
			<h1>Comment: {comment}</h1>

			<h1 className="text-center text-lg font-bold my-8">History changes:</h1>
			<p className="text-center mb-4">Text marked in <span className="text-red-500 font-bold">red</span> is changes from the previous.</p>
			{history.map((order, i) => (
				<div key={order._id} className="my-4">
					<h1>New order: {i > 0 ? order.newOrder !== history[i - 1].newOrder ? <span className="text-red-500 font-bold">{order.newOrder}</span> : <span>{order.newOrder}</span> : order.newOrder}</h1>
					<h1>Old order: {i > 0 ? order.oldOrder !== history[i - 1].oldOrder ? <span className="text-red-500 font-bold">{order.oldOrder}</span> : <span>{order.oldOrder}</span> : order.oldOrder}</h1>
					<h1>Comment: {i > 0 ? order.comment !== history[i - 1].comment ? <span className="text-red-500 font-bold">{order.comment}</span> : <span>{order.comment}</span> : order.comment}</h1>
					<h1>Changed by: {order.userEdited.name}</h1>
				</div>

			))}
		</div>
	)
}