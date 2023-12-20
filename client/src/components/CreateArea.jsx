import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateArea(props){

    const [fullNote, setFullNote ] = useState({
        title: "",
        content: ""
    });


    const navigate = useNavigate();

    
    const handleChange = (e)=>{
        setFullNote((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }


    const handleClick = async()=>{
        // e.preventDefault();
        
        try{ 
            await axios.post(`/posts/`, fullNote);
            navigate("/")
        } catch(err){
            console.log(err)
        }
    }

    const deleteAll = async(e)=>{
        e.preventDefault();
        try{
            await axios.delete("/posts")
            navigate("/")
        } catch(err){
            console.log(err)
        }
    }


    return (
        <div>
          <form  >
            <input spellCheck="false" name="title"  placeholder="Enter Title" onChange={handleChange} autoFocus />
            <textarea spellCheck="false" name="content" placeholder={fullNote.title === "" ? "Take a Note ..." : "Take a Note for " + fullNote.title} rows="3" onChange={handleChange} />
            <button style={{right : "18px", borderRadius: "10px", width : "80px", fontSize: "16px"}} onClick={handleClick}>Add</button>
            {/* <button style={{left : "18px", borderRadius: "10px", width : "100px"}} type="reset" onClick={deleteAll}>Delete All</button> */}
          </form>
        </div>
      );
}

export default CreateArea;



