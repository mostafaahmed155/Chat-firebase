import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firbase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const {currentUser}=useContext(AuthContext)
  return (
    <div className="navbar">
      <span className="logo"> Nixa chat</span>
      <div className="user"></div>
      <img
        src={currentUser.photoURL}
        alt=""
      />
      <span>{currentUser.displayName}</span>
      <button onClick={()=>signOut(auth)}>logout</button>
    </div>
  );
};

export default Navbar;
