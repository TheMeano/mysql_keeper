import React, { useState } from "react";

function CreateArea(props){

    const [fullNote, setFullNote] = useState({
        title : "",
        content : ""
    });

    function handleChange(evt){

        const {name, value } = evt.target;

        setFullNote((prevNote)=> {
            return{
                ...prevNote,
                [name] : value
            }
        })
    }

    function submitNote(evt){
        props.onAdd(fullNote);
        setFullNote({
            title : "",
            content : ""
        });
        evt.preventDefault();
    }

    return (
        <div>
          <form onSubmit={submitNote}>
            <input name="title" value={fullNote.title} placeholder="Enter Title" onChange={handleChange} autoFocus />
            <textarea name="content" value={ fullNote.content} placeholder={fullNote.title === "" ? "Take a Note ..." : "Take a Note for " + fullNote.title} rows="3" onChange={handleChange} />
            <button type="submit">Add</button>
            <button style={{left : "18px", borderRadius: "10px", width : "100px"}} type="reset" onClick={()=> props.deleteAll()}>Delete All</button>
          </form>
        </div>
      );
}

export default CreateArea;