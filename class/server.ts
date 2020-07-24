import express from 'express';
import {SERVER_PORT} from '../global/environment';
import socketIO from 'socket.io';
import http from 'http'; 
import * as socket from '../sockets/socket';

export default class Server{

    private static _instance: Server;
    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;  //Para trabajar con socket.io se necesita http en lugar de "app" de Express.

    constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app); //Le pasamos la configuración de Express a httpServer para poder trabajar con Socket.io.
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
    }

    public static get instance(){
        //Si existe una instancia la regresa, sino crea una nueva.
        return this._instance || (this._instance = new this());
    }

    private escucharSockets(){
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente => {
            //console.log('Cliente conectado');
            console.log(cliente.id); //Muestra el ID dado por el socket al usuario conectado.

            //Conectar cliente
            socket.conectarCliente(cliente);

            //Configurar Usuarios
            socket.configurarUsurio(cliente, this.io);

            //Escuchar mensajes
            socket.fnMensaje(cliente, this.io);

            //Desconectar cliente
            socket.desconectar(cliente, this.io);

            //Emite los usuarios-activos para que el cliente los reciba.
            socket.obtenerUsuarios(cliente, this.io);

            
        });
    }

    start(callback: Function){
        //this.app.listen(this.port, callback());  //Para trabajar con Socket.io dejamos de escuchar con Express
        this.httpServer.listen(this.port, callback()); //Ahora escuchamos con el httpServer.
    }
}
