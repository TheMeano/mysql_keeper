import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import CreateArea from "./CreateArea";
import "../styles.css"

function App() {
  const [notes, setNotes] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page if not logged in
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchAllPosts = async () => {
      try {
        const res = await axios.get("/posts/");
        setNotes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPosts();
  }, [currentUser, navigate]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/posts/${postId}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== postId));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <CreateArea />
      {notes.map((note) => (
        <div className="note" key={note.id}>
          <h1>{note.title === "" ? "Untitled" : note.title}</h1>
          <p>- {note.content}</p>
          <button onClick={()=> handleDelete(note.id)}>Delete</button>
          <Link className="link" to={`/update/${note.id}`}>
            <button>Update</button>
          </Link>
        </div>
      ))}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
