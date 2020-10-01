import SocketServer, {ServerOptions as SocketServerOptions} from 'socket.io';
import {Server as HttpServer, ServerOptions as HttpServerOptions} from 'http';
import app from 'express';
const expressApp = app();
const httpServer: HttpServer = new HttpServer(expressApp);
const socketServer = SocketServer(httpServer);

let last_bingo = {bingo: 1};
const port = 12345;
socketServer.on("connection", socket => {
    console.log('connected with id', socket.client.id);
    socketServer.emit("bingo", JSON.stringify(last_bingo));
    socket.on('editBingo', (bingo) => {
        console.log('received new bingo :', bingo);
        last_bingo = bingo;
        socketServer.emit("bingo", JSON.stringify(last_bingo));
    } )
});

httpServer.listen(port,() => console.log('listening port', port));
