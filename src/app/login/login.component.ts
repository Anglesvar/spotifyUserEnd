import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private router: Router,private fb: FormBuilder,private http: HttpClient, private loginService: LoginService) { 
    this.loginForm = this.fb.group({
      'email': this.fb.control(''),
      'password': this.fb.control('')
    });
    if(localStorage.getItem("ownerId"))
      this.router.navigateByUrl("/home");
  }
  login(){
    console.log(this.loginForm.value);
    this.loginService.postLogin(this.loginForm.value).subscribe(res=>{
      console.log(res);
      localStorage.removeItem("ownerId");
      localStorage.setItem("ownerId",res.ownerId);
      this.loginService.postUserInfo(parseInt(localStorage.getItem('ownerId'))).subscribe(res=>{
        console.log(res);
        localStorage.setItem("displayName",res.displayName);
      })
      this.router.navigateByUrl('/home');
    })
  
  }
  ngOnInit(): void {
  }

}
