import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from '../../../services/socket.service';
import {Subscription} from 'rxjs';
import {BingoItem} from '../../../models/Bingo';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit, OnDestroy {
  private bingoSub: Subscription;
  newBingoItem: string;
  newBingoItems: BingoItem[] = [];
  constructor(private socket: SocketService, private alert: AlertController) { }

  ngOnInit() {
    this.bingoSub = this.socket.bingoItems.subscribe((doc) => {
      if (typeof doc !== 'object'){
        this.newBingoItems = JSON.parse(doc);
      }
      else {
        this.newBingoItems = doc;
      }
    });
  }

  ngOnDestroy() {
    this.bingoSub.unsubscribe();
  }

  addBingo() {
    if (this.newBingoItem !== undefined) {
      this.socket.addBingoItem(this.newBingoItem);
      this.newBingoItem = undefined;
    }
  }
  async createBingo(){
    if (this.newBingoItems !== []) {
      const alert = await this.alert.create({
        message: 'Please enter the name of your new card.',
        inputs: [{
          name: 'cardName',
          type: 'text',
          id: 'name2-id',
          value: '',
          placeholder: 'Placeholder 2'
        }],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (a) => {
              this.socket.addBingoCard(a.cardName, this.newBingoItems);
              this.newBingoItems.forEach((item) => this.socket.removeBingoItem(item));
              console.log('Confirm Ok', a);
            }
          }
        ]
      });
      await alert.present();
    }
  }

}
