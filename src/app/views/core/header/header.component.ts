import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment.prod';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showAbout = false;
  selectedGif;
  version = environment.version;

  constructor() {
    this.randomHelloGif();
  }

  ngOnInit(): void {
  }

  showModalAbout(): void {
    this.showAbout = true;
  }

  randomHelloGif(): void {
    const gifs = ['robot-loses-head.gif', 'robot-happy.gif', 'robot-bird.gif', 'robot-brow.gif', 'robot-coin.gif', 'robot-head-one.gif', 'robot-magic.gif', 'robot-fire.gif', 'robot-skate.gif'];
    const random = Math.floor(Math.random() * gifs.length);
    this.selectedGif = gifs[random];
  }

}
