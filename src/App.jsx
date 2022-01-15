import './App.css';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'

function App() {
  let navigate = useNavigate();

  function Logout() {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div>
      {/*<div className="flow space-x-4">
        <Link to="/home">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <a onClick={Logout}>Logout</a>
      </div>*/}
    </div>
  );
}

export default App;
