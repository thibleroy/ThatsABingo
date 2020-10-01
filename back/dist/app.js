"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const expressApp = express_1.default();
const httpServer = new http_1.Server(expressApp);
const socketServer = socket_io_1.default(httpServer);
const bingos = [];
const port = 12345;
socketServer.on("connection", socket => {
    const addr = socket.handshake.address;
    console.log('connected with ip', addr);
    socketServer.emit("bingo", JSON.stringify(bingos));
    socket.on('editBingo', (bingo) => {
        console.log('edit bingo :', bingo);
        const id = bingos.findIndex((obj => obj.id === bingo.id));
        bingos[id].value = bingo.value;
        socketServer.emit("bingo", JSON.stringify(bingos));
    });
    socket.on('addBingo', (bingo) => {
        console.log('received new bingo :', bingo);
        bingos.push(bingo);
        socketServer.emit("bingo", JSON.stringify(bingos));
    });
});
httpServer.listen(port, () => console.log('listening port', port));
