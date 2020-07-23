import {Router, Request, Response} from 'express';
import Server from '../class/server';

export const router = Router();

router.get('/mensajes', (req:Request, res:Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo OK.'
    });
});

router.post('/mensajes', (req:Request, res:Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        de, cuerpo
    };
    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req:Request, res:Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de, cuerpo
    };

    //Esta instancia, al tratarse de un SIGLETON, tenemos la misma instancia que está corriendo en la app de NODE.
    const server = Server.instance;
    //Cada sesión se une al chat general y a una sala identificada por su ID de conexión al socket.
    server.io.in(id).emit('mensaje-privado', payload); //io.in() identifica la sala privada del usuario. Si se quita "in()" el mensaje se envía a todos los usuarios conectados.

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});