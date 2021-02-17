const express = require('express');
const cors = require('cors');
const app = express();

//settings (configurar servidor)
app.set('port', process.env.PORT || 8080);

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/users', require('./routes/users'));
app.use('/api/notes', require('./routes/notes'));

//heroku
if (process.env.NODE_ENV === 'production'){
    
}

module.exports = app;