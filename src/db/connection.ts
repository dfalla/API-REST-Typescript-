import { createConnection } from 'mysql'


const connection = createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '16falladapeta03',
    database : 'inventario'
});
   
export default connection;