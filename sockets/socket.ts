import { Socket } from 'socket.io';
import socketIO from 'socket.io'


export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado.');
    });
}

//Escuchar eventoMensaje emitido por el ciente.
export const fnMensaje = ( cliente: Socket, io:socketIO.Server) => {
    cliente.on('eventoMensaje', (payload: {de: string, cuerpo: string}) =>{
        console.log('Mensaje recibido ... ', payload);
        io.emit('mensaje-nuevo', payload);
    });
}