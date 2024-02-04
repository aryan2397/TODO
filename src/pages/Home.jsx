import React, { useContext, useEffect, useState } from "react";
import axios from "Axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";

function home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(Context);

  const updateHandeller = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh(prev=>!prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandeller = async(id) => {
    try {
      const { data } = await axios.delete(
        `${server}task/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh(prev=>!prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandeller = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${server}task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTitle("");
      setDescription("");
      toast.success(data.message);
      setIsLoading(false);
      setRefresh(prev=>!prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}task/all`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandeller}>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
              type="text"
              placeholder="Title"
            />
            <input
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
              type="text"
              placeholder="Description"
            />
            <button disabled={loading} type="submit">
              Add task
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {tasks.map((i) => (
          <TodoItem
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandeller={updateHandeller}
            deleteHandeller={deleteHandeller}
            id={i._id}
            key={i._id}
          />
        ))}
      </section>
    </div>
  );
}

export default home;
