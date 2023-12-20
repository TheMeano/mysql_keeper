import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [updatedNote, setUpdatedNote] = useState({
    title: "",
    content: ""
  });

  const handleChange = (e)=>{
    setUpdatedNote((prev)=>({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }
  
  const handleClick = async(e)=>{
    e.preventDefault();
    try{  
      await axios.put(`/posts/${postId}`, updatedNote)
      navigate("/")
    } catch(err){
      console.log(err)
    }
  }
  
  console.log(updatedNote)

  return (
    <div>
      <div>
        <form>
          <input
            spellCheck="false"
            value={updatedNote.title}
            name="title"
            onChange={handleChange}
            placeholder="Enter New Title"
            autoFocus
          />
          <textarea
            spellCheck="false"
            value={updatedNote.content}
            name="content"
            onChange={handleChange}
            placeholder={"Enter new Content"}
          />
          <button
            onClick={handleClick}
            style={{ width: 'max-content', padding: '5px', borderRadius: '5px' }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
