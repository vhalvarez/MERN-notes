import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function CreateNote(props) {

    const [ users, setUsers ] = useState([]);
    const [ selected, setUserSelected ] = useState({
        userSelected: '',
        title: '',
        content: ''
    });
    const [ date, setDate ] = useState(new Date());
    const [ edit, setEdit ] = useState(false);
    const [ id, setId ] = useState('');

    useEffect( () => {
        let isMounted = true;
        axios({
            method: 'GET',
            url: 'http://localhost:4000/api/users'
        }).then(res => {
            if (isMounted) setUsers(res.data);   
        })

        if ( props.match.params.id ) {
            axios({
                method: 'GET',
                url: 'http://localhost:4000/api/notes/' + props.match.params.id
            }).then( res => {
                setUserSelected({
                    title: res.data.title,
                    content: res.data.content,
                    userSelected: res.data.author
                })
            })
            setEdit(true) 
            setId(props.match.params.id)
        }

        return () => { isMounted = false };
    }, [] )

    const onSubmit = e => {
        e.preventDefault();

        const newNote = {
            title: selected.title,
            content: selected.content,
            date: date,
            author: selected.userSelected !== '' ? selected.userSelected : users[0].username
        };

        if(edit){
            axios({
                url: 'http://localhost:4000/api/notes/'  + id,
                method: 'put',
                data: newNote
            })
        } else {
            axios({
                url: 'http://localhost:4000/api/notes',
                method: 'post',
                data: newNote
            })
        }

        // redirrecion
        window.location.href = '/';
    }

    const onInputChange = e => {
        setUserSelected ({
            ...selected,
            [e.target.name]: e.target.value
        })
    }

    const onChangeDate = date => {
        setDate(date);
    }

    return (
        <div className="col-md-6 offset-md-3">
            <div className="card card-body">
                <h4>Create a Note</h4>
                
                {/* Select user */}
                <div className="form-group">
                    <select
                        className="form-control"
                        name="userSelected"
                        onChange={onInputChange}
                        value={selected.userSelected}
                    >
                        {
                            users.map( user => 
                                <option key={user.username}>
                                    {user.username}
                                </option>
                            )
                        }
                    </select>
                </div>

                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        name="title"
                        onChange={onInputChange}
                        value={selected.title}
                        required
                    />
                </div>

                <div className="form-group">
                    <textarea 
                        name="content"
                        className="form-control"
                        placeholder="content"
                        onChange={onInputChange}
                        value={selected.content}
                        required
                    >

                    </textarea>
                </div>

                <div className="form-group">
                    <DatePicker 
                        className="form-control"
                        selected={date}
                        onChange={onChangeDate}
                    />
                </div>


                <form onSubmit={onSubmit}>
                    <button className="btn btn-primary">
                        Save a note
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateNote