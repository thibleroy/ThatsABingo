import SocketServer, {ServerOptions as SocketServerOptions} from 'socket.io';
import {Server as HttpServer, ServerOptions as HttpServerOptions} from 'http';
import app from 'express';
const expressApp = app();
const httpServer: HttpServer = new HttpServer(expressApp);
const socketServer = SocketServer(httpServer);
interface Bingo {
    id: string;
    value: string;
}
const bingos: Bingo[] = [];
const port = 12345;
socketServer.on("connection", socket => {
    const addr = socket.handshake.address;
    console.log('connected with ip', addr);
    socketServer.emit("bingo", JSON.stringify(bingos));
    socket.on('editBingo', (bingo: Bingo) => {
        console.log('edit bingo :', bingo);
        const id = bingos.findIndex((obj => obj.id === bingo.id));
        bingos[id].value = bingo.value;
        socketServer.emit("bingo", JSON.stringify(bingos));
    });
    socket.on('addBingo', (bingo: Bingo) => {
        console.log('received new bingo :', bingo);
        bingos.push(bingo);
        socketServer.emit("bingo", JSON.stringify(bingos));
    });
});

httpServer.listen(port,() => console.log('listening port', port));
