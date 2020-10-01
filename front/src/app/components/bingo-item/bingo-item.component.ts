import {Component, OnInit, Input} from '@angular/core';
import {SocketService} from '../../../services/socket.service';
import {BingoItem} from '../../../models/Bingo';

@Component({
  selector: 'bingo-item',
  templateUrl: './bingo-item.component.html',
  styleUrls: ['./bingo-item.component.scss'],
})
export class BingoItemComponent implements OnInit {
  @Input() currentBingo: BingoItem;
  constructor(private socket: SocketService) { }

  ngOnInit() {
  }
  editBingoItem(){
    this.socket.editBingoItem(this.currentBingo);
  }
  removeBingoItem(){
    this.socket.removeBingoItem(this.currentBingo);
  }
}
