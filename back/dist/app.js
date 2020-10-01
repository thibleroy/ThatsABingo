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
let last_bingo = { bingo: 1 };
const port = 12345;
socketServer.on("connection", socket => {
    console.log('connected with id', socket.client.id);
    socketServer.emit("bingo", JSON.stringify(last_bingo));
    socket.on('editBingo', (bingo) => {
        console.log('received new bingo :', bingo);
        last_bingo = bingo;
        socketServer.emit("bingo", JSON.stringify(last_bingo));
    });
});
httpServer.listen(port, () => console.log('listening port', port));
