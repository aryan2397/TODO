import React, { useContext, useState } from "react";
import { Link,Navigate } from "react-router-dom";
import axios from "Axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated,setIsAuthenticated, loading, setIsLoading } = useContext(Context);

  const submitHandeller = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${server}users/new`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  if(isAuthenticated){
    return <Navigate to={"/"}/>
  }

  return (
    <div>
      <div className="login">
        <section>
          <form onSubmit={submitHandeller}>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              type="text"
              placeholder="Name"
            />
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              type="email"
              placeholder="Email"
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type="password"
              placeholder="Password"
            />
            <button type="submit">Sign Up</button>
            <h4>Or</h4>
            <Link to="/login">Login</Link>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Register;
