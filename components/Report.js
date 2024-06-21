// components/Report.js

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";

const Report = () => {
  return (
    <div>
      <Navbar />
      <div>
         <h1>Statistiques</h1>
      </div>
    </div>
  )
}
export default Report