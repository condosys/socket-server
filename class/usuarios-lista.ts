import { Usuario } from "./usuario";


export class UsuariosLista {

    private lista: Usuario[]=[];

    constructor(){}

    public agregar(usuario: Usuario){
        this.lista.push(usuario);

        console.log(this.lista);
        return usuario;
    }

    public actualizarNombre(id:string, nombre:string){
        for(let usr of this.lista){
            if(usr.id === id){
                usr.nombre = nombre;
                break;
            }
        }

        console.log('=== Actualizando usuario ===');
        console.log(this.lista);
    }


    //Obtener lista de usuarios    
    public getLista(){
        return this.lista.filter(usr => usr.nombre !== 'Sin-nombre');
    }

    //Obtener un usuario en particular
    public getUsuario(id:string){
        return this.lista.find(usr => usr.id === id );
    }

    //Obtenemos todos los usuarios que están en una sala.
    public getUsuariosEnSala(sala:string){
        return this.lista.filter(usr => usr.sala === sala );
    }

    //Borrar usuarios.
    public borrarUsuario(id:string){
        const tempUsuario = this.getUsuario(id); //Obtiene el objeto del Usuario que se quiere borrar, para tenerlo temporalmente en memoria y poder mandar en el mensaje que usuario se eliminó.

        this.lista = this.lista.filter(usr => usr.id !== id );

        return tempUsuario; //Para reportar qué usuario se borró.
    }



}