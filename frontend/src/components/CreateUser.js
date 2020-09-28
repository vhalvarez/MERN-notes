import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Emoji from 'a11y-react-emoji'

function CreateUser() {
    const [ users, setUsers ] = useState([]);
    const [ username, setUsername ] = useState('');

    useEffect( () => {
        let isMounted = true;
        axios({
            method: 'GET',
            url: 'http://localhost:4000/api/users'
        }).then(res => {
            if(isMounted) setUsers(res.data)
        })
        return () => { isMounted = false };
    }, [users])

    const onChangeUsername = (e) => {
        setUsername({
            username: e.target.value
        })
    }

    const onSubmit =  (e) => {
        e.preventDefault();

        axios({
          url: 'http://localhost:4000/api/users',
          method: 'post',
          data: username
        })
    }

    const deleteUser = (id) => {
        axios({
            url: 'http://localhost:4000/api/users/' + id,
            method: 'delete'
        })
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card card-body">
                    <h3>Create New User</h3>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className="form-control"
                                
                                onChange={onChangeUsername}
                            />
                        </div>
                        <button className="btn btn-primary" type="submit">
                            Guardar
                        </button>
                    </form>
                </div>
            </div>
            <div className="col-md-8">
                <ul className="list-group-item list-group-item-action">
                    {
                        users.length !== 0 
                        ?
                        users.map(user => 
                            <li 
                                key={user._id} 
                                className="list-group-item"
                                onDoubleClick={ () => deleteUser(user._id)}
                            >
                                {user.username}
                            </li>
                        )
                        :
                        <div className="col-md-12 text-center p-4">
                            <h4>Sorry but no users <Emoji symbol="😢" label="crying face" /></h4>
                        </div>
                    }
                </ul>
            </div>
        </div>
    )
}

export default CreateUser
