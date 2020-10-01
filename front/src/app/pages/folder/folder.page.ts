import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {SocketService} from '../../../services/socket.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, private socket: SocketService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('docs', this.socket.documents);
  }

}
