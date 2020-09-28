import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {format} from 'timeago.js'
import Emoji from 'a11y-react-emoji'
import {Link} from 'react-router-dom'

function NotesList() {

    const [notes, setNotes] = useState([])

    useEffect(() => {
        let isMounted = true;
        axios({
            method: 'GET',
            url: 'http://localhost:4000/api/notes'
        }).then(res => {
            if (isMounted) setNotes(res.data)
        })

        return () => { isMounted = false };
    }, [notes])

    const deleteNote = (id) => {
        axios({
            method: 'delete',
            url: 'http://localhost:4000/api/notes/' + id
        })
    }

    const isNotes = notes.length !== 0;
    return (
        <div className="row">
           {

            isNotes

            ? 

            notes.map( note => 
                <div className="col-md-4 p-2" key={note._id}>
                    <div className="card">
                        <div className="card-header d-flex justify-content-between">
                             <h5>{note.title}</h5> 
                             <Link 
                                to={"/edit/" + note._id}
                                className="btn btn-secondary"
                            >
                                Edit
                             </Link>
                        </div>
                        <div className="card-body">
                             <p>{note.content}</p>
                             <p>{note.author}</p>
                             <p>{format(note.date)}</p>
                        </div>
                        <div className="card-footer">
                            <button 
                                 className="btn btn-danger" 
                                 onClick={ () => deleteNote(note._id) }
                             >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )
            
            :

            <div className="col-md-12 text-center p-4">
                <h4>Sorry but no notes <Emoji symbol="😢" label="crying face" /></h4>
            </div>


           }
        </div>
    )
}

export default NotesList
