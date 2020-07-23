import { Socket } from 'socket.io';
import socketIO from 'socket.io'
import { UsuariosLista } from '../class/usuarios-lista';
import { Usuario } from '../class/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}


export const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {                
        let usrDescon = usuariosConectados.borrarUsuario(cliente.id);
        console.log('Cliente desconectado', usrDescon?.id);

    });
}

//Escuchar eventoMensaje emitido por el ciente.
export const fnMensaje = ( cliente: Socket, io:socketIO.Server) => {
    cliente.on('eventoMensaje', (payload: {de: string, cuerpo: string}) =>{
        console.log('Mensaje recibido ... ', payload);
        io.emit('mensaje-nuevo', payload);
    });
}

//Escuchar eventoMensaje emitido por el ciente.
export const configurarUsurio = ( cliente: Socket, io:socketIO.Server) => {
    cliente.on('configurar-usuario', (payload: {nombre: string}, callback: Function) => {
        //console.log('Configurando usr:',payload.nombre);

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        callback({
            ok:true,
            mensaje:`Usuario ${payload.nombre} configurado.`
        });
    });
}