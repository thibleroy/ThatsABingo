import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {docId} from '../utils';
import {BingoItem, BingoCard, bingoTopics} from '../models/Bingo';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  constructor(private socket: Socket) { }
  bingoItems = this.socket.fromEvent<BingoItem[]>(bingoTopics.items.GET);
  bingoCards = this.socket.fromEvent<BingoCard[]>(bingoTopics.cards.GET);
  editBingoItem(item: BingoItem){
    this.socket.emit(bingoTopics.items.EDIT, item);
  }
  addBingoItem(value: string){
    const newBingo: BingoItem = {value, id: docId()};
    this.socket.emit(bingoTopics.items.ADD, newBingo);
  }
  removeBingoItem(item: BingoItem){
    this.socket.emit(bingoTopics.items.REMOVE, item);
  }
  editBingoCard(card: BingoCard){
    this.socket.emit(bingoTopics.cards.EDIT, card);
  }
  addBingoCard(name: string, items: BingoItem[]){
    const newCard: BingoCard = {name, id: docId(), bingoItems: items};
    this.socket.emit(bingoTopics.cards.ADD, newCard);
  }
  removeBingoCard(card: BingoCard){
    this.socket.emit(bingoTopics.cards.REMOVE, card);
  }
}
