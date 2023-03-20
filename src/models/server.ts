import express, { Application } from 'express';
import connection from '../db/connection';
import RoutesProducto from '../routes/producto.routes';
import RoutesDefault from '../routes/default.routes'
import RoutesUsuarios from '../routes/usuario.routes'
import cors from 'cors'




class Server {
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.conectDB();
        this.cors();
        this.middlewares();
        this.routes();
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }

    conectDB(){
        connection.connect((err)=>{
            if(err){
                console.log(err);
            } else {
                console.log('Base de datos conectada')
            }
        })
    }

    routes() {
        this.app.use('/', RoutesDefault)
        this.app.use('/api/productos', RoutesProducto)
        this.app.use('/api/usuarios', RoutesUsuarios)
        
    }

    middlewares(){
        this.app.use(express.json());
    }

    cors(){
        this.app.use( cors() )
    }


}

export default Server;