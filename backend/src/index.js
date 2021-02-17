require('dotenv').config();

const app = require('./app');
require('./database');

// Función para ejecutar el servidor
async function main () {
    await app.listen(app.get('port'));
    console.log('Server on port ' + app.get('port'));
}

//servidor
main();