import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
interface Bingo{
  id: string;
  value: string;
}
@Injectable({
  providedIn: 'root'
})

export class SocketService {
  constructor(private socket: Socket) { }
  bingo = this.socket.fromEvent<any>('bingo');
  editBingo(bingo: Bingo){
    this.socket.emit('editBingo', bingo);
  }
  addBingo(bingo: Bingo){
    this.socket.emit('addBingo', bingo);
  }
}
