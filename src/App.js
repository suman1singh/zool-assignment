import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main";
import Detail from "./Detail";
import "./App.css";

export default function App() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const now = new Date();
  const date = now.getDate();
  const year = now.getFullYear();
  const day = days[now.getDay()];
  const month = months[now.getMonth()];

  return (
    <Fragment>
      <div className="navBar">
        <h5 className="head">
          Market Today{" "}
          <span>
            ({day}, {date}th {month} {year})
          </span>
        </h5>
      </div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />}></Route>
          <Route exact path="/detail/:id" element={<Detail />}></Route>
        </Routes>
      </Router>
    </Fragment>
  );
}
