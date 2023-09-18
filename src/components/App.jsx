import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App(){

    const [notes, setNotes] = useState([]);

    function addItem(fullNote){
        setNotes((prevNotes)=>{
            return [...prevNotes, fullNote]
        });
    }

    function deleteItem(id){
        setNotes((prevNotes)=>{
            return prevNotes.filter((keeperEntry, index)=>{
                return index !== id
            });
        })
    }

    function deleteAll(evt){
        setNotes([]);
        
    }

    return(
        <div>
            <Header />
            <CreateArea onAdd={addItem} deleteAll={deleteAll}  />
            {notes.map((newNote, index) => <Note title={newNote.title === "" ? "Untitled" : newNote.title} content={newNote.content === "" ? "-" : "- " + newNote.content} key={index} id={index} deleteItem={deleteItem} />)}
            <Footer />
        </div>
    );
}

export default App;