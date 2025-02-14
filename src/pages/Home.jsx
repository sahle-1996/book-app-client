import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const usernameLocal = localStorage.getItem("user");
  console.log(usernameLocal);
  if (usernameLocal == null) {
    navigate("/");
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    axios
      .get("https://books-app-server-1.onrender.com/user/books", config)
      .then((response) => {
        console.log("data ", response);
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="container p-4">
      <div className="flex justify-between items-center">
        <h1 className="lead display-4 mt-5">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="display-5" />
        </Link>
        <span className="mx-2">Welcome, {usernameLocal}!</span>
        <button className="btn btn-primary my-3" onClick={handleLogOut}>
          Log Out
        </button>
      </div>

      <BooksTable books={books} />
    </div>
  );
};

export default Home;
