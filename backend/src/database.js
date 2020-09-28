//Conexión a base de datos
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI 
    ? process.env.MONGODB_URI 
    : 'mongodb://localhost/test' ;

mongoose.connect(URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
    
});

const connection = mongoose.connection;

// si existe la conexion a la base de datos, enviar un mensaje a la consola
connection.once('open', () => {
    console.log('DB is connected');
})