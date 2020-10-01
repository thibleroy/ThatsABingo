import SocketServer, {ServerOptions as SocketServerOptions} from 'socket.io';
import {Server as HttpServer, ServerOptions as HttpServerOptions} from 'http';
import app from 'express';
const expressApp = app();
const httpServer: HttpServer = new HttpServer(expressApp);
const socketServer = SocketServer(httpServer);
interface BingoItem {
    id: string;
    value: string;
}
interface BingoCard {
    name: string
    bingoItems: BingoItem[];
    id: string;
}
const bingoTopics = {
    items: {
        GET: 'getBingoItems',
        ADD: 'addBingoItems',
        EDIT: 'editBingoItems',
        REMOVE: 'removeBingoItems'
    },
    cards: {
        GET: 'getBingoCards',
        ADD: 'addBingoCards',
        EDIT: 'editBingoCards',
        REMOVE: 'removeBingoCards'
    }
};
const newBingoItems: BingoItem[] = [];
const bingoCard_1: BingoCard = {
    name: 'card1',
    bingoItems: [{id: '&é', value: 'test'}, {id: 'ezds', value: 'test2'}],
    id: 'ejdjz'
};
const bingoCard_2: BingoCard = {
    name: 'card2',
    bingoItems: [{id: '&é', value: 'test'}, {id: 'ezds', value: 'test2'}],
    id: 'jifjc'
};
const bingoCards: BingoCard[] = [bingoCard_1, bingoCard_2];
const port = 12345;
socketServer.on("connection", socket => {
    const addr = socket.handshake.address;
    console.log('connected with ip', addr);
    socketServer.emit(bingoTopics.items.GET, newBingoItems);
    socketServer.emit(bingoTopics.cards.GET, bingoCards);

    socket.on(bingoTopics.items.EDIT, (bingo: BingoItem) => {
        console.log('edit bingo :', bingo);
        const index = newBingoItems.findIndex((obj => obj.id === bingo.id));
        newBingoItems[index].value = bingo.value;
        socketServer.emit(bingoTopics.items.GET, newBingoItems);
    });

    socket.on(bingoTopics.items.ADD, (bingo: BingoItem) => {
        console.log('received new bingo :', bingo);
        newBingoItems.push(bingo);
        socketServer.emit(bingoTopics.items.GET, newBingoItems);
    });

    socket.on(bingoTopics.items.REMOVE, (bingo: BingoItem) => {
        console.log('delete bingo :', bingo);
        const index = newBingoItems.findIndex((obj => obj.id === bingo.id));
        if (index > -1) {
            newBingoItems.splice(index, 1);
        }
        socketServer.emit(bingoTopics.items.GET, newBingoItems);
    });





    socket.on(bingoTopics.cards.ADD, (card: BingoCard) => {
        console.log('received new card :', card);
        bingoCards.push(card);
        socketServer.emit(bingoTopics.cards.GET, bingoCards);
    });

    socket.on(bingoTopics.cards.REMOVE, (card: BingoCard) => {
        console.log('delete bingo card :', card);
        const index = bingoCards.findIndex((obj => obj.id === card.id));
        if (index > -1) {
            bingoCards.splice(index, 1);
        }
        socketServer.emit(bingoTopics.cards.GET, bingoCards);
    });

    socket.on(bingoTopics.cards.EDIT, (card: BingoCard) => {
        console.log('edit bingo card:', card);
        const index = bingoCards.findIndex((obj => obj.id === card.id));
        bingoCards[index].bingoItems = card.bingoItems;
        socketServer.emit(bingoTopics.cards.GET, bingoCards);
    });
});

httpServer.listen(port,() => console.log('listening port', port));
