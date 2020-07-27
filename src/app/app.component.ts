import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  hidden:boolean=true;
  constructor(private router: Router){
    setInterval(function(){
      if(localStorage.getItem('ownerId'))
        this.hidden = false;
   }, 1000);
   
  }
  
  title = 'Audio Task';
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
}
