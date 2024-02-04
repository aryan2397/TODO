import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios"
import toast from "react-hot-toast";
import Login from "../pages/Login";

export default function Header() {
  const { isAuthenticated, setIsAuthenticated, loading, setIsLoading } = useContext(Context);

  const logoutHandeller = async (e) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${server}users/logout`, {
        withCredentials: true,
      });

      toast.success("Logout Successful");
      setIsAuthenticated(false);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setIsLoading(false);
    }
  };

  return (
    <nav className="header">
      <div>
        <h2>TODO App.</h2>
      </div>
      <article>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        {isAuthenticated ? (
          <button disabled={loading} onClick={logoutHandeller} className="btn">Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </article>
    </nav>
  );
}
