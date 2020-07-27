import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SongService } from './service/song.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hidden:boolean=true;
  songs:any;
  constructor(){
   
  }
  
  title = 'Audio Task';
  
}
