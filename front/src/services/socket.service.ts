import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket) { }
  bingo = this.socket.fromEvent<any>('bingo');
  editBingo(bingo: string){
    this.socket.emit('editBingo', bingo);
  }
}
