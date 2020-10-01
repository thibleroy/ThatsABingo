import { Component, OnInit, OnDestroy } from '@angular/core';
import {SocketService} from '../../../services/socket.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'so-comp',
  templateUrl: './socomp.component.html',
  styleUrls: ['./socomp.component.scss'],
})
export class SocompComponent implements OnInit, OnDestroy {
  currentBingo: any;
  private bingoSub: Subscription;
  constructor(private socket: SocketService) { }

  ngOnInit() {
    this.currentBingo = this.socket.bingo;
    this.bingoSub = this.socket.bingo.subscribe(doc => this.currentBingo = doc);
  }
  ngOnDestroy() {
    this.bingoSub.unsubscribe();
  }
}
