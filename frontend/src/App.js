import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navegation from './components/Navegation';
import NotesList from './components/NotesList';
import CreateUser from './components/CreateUser';
import CreateNote from './components/CreateNote';

function App() {
  return (
    <Router>
 
        <Navegation />
        
        <div className="container p-4">
          <Route path="/" exact component={NotesList} />
          <Route path="/edit/:id" component={CreateNote} />
          <Route path="/create" component={CreateNote} />
          <Route path="/user" component={CreateUser} />
        </div>


    </Router>

  );
}

export default App;
