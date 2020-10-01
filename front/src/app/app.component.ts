import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Subscription} from 'rxjs';
import {SocketService} from '../services/socket.service';
import {BingoCard} from '../models/Bingo';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  private bingoSub: Subscription;
  currentBingoCards: BingoCard[];
  public appPages = [
    {
      title: 'New bingo',
      url: '/bingo/new',
      icon: 'happy'
    }];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private socket: SocketService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    if (this.platform.is('cordova')){
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }
  }

  ngOnInit() {
    this.bingoSub = this.socket.bingoCards.subscribe((doc) => {
      console.log('obj', doc);
      if (typeof doc !== 'object'){
        this.currentBingoCards = JSON.parse(doc);
      }
      else {
        this.currentBingoCards = doc;
      }
    });
  }
}
