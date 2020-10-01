import SocketServer, {ServerOptions as SocketServerOptions} from 'socket.io';
import {Server as HttpServer, ServerOptions as HttpServerOptions} from 'http';
import app from 'express';
const expressApp = app();
const httpServer: HttpServer = new HttpServer(expressApp);
const socketServer = SocketServer(httpServer);

const documents = {hey: 1};
const port = 12345;
socketServer.on("connection", socket => {
    console.log('connected with id', socket.client.id);
    socketServer.emit("documents", JSON.stringify(documents));
});

httpServer.listen(port,() => console.log('listening port', port));
