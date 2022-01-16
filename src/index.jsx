import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './routes/Login'
import Register from './routes/Register'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AllReturns from './Test/routes/AllReturns';
import Container from './Test/Container';
import Dashboard from './Test/Dashboard';
import YourReturns from './Test/routes/YourReturns';
import ReadyToPickup from './Test/routes/ReadyToPickup';
import Reportabug from './Test/routes/ReportABug';
import Returnssent from './Test/routes/Returnssent';
import EditAccount from './Test/routes/EditAccount';
/*import EditReturn from './Test/routes/EditReturn';*/

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/*<Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="addreturn" element={<AddReturn />} />*/}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="" element={<Container />}>
          <Route path="" element={<Dashboard />} />
          <Route path="allreturns" element={<AllReturns />} />
          <Route path="yourreturns" element={<YourReturns />} />
          <Route path="readypickup" element={<ReadyToPickup />} />
          <Route path="reportabug" element={<Reportabug />} />
          <Route path="returnssent" element={<Returnssent />} />
          <Route path="editaccount" element={<EditAccount />} />
          {/*<Route path="editreturn/:id" element={<EditReturn />} />*/}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
