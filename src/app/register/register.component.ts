import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../service/login.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  constructor(private router: Router,private fb: FormBuilder,private http: HttpClient, private loginService: LoginService) { 
    this.registerForm = this.fb.group({
      "firstName": this.fb.control(''),
      "lastName": this.fb.control(''),
      "mobileNumber": this.fb.control(''),
      "displayName": this.fb.control(''),
      'email': this.fb.control(''),
      'password': this.fb.control('')
    });
    if(localStorage.getItem("ownerId"))
      this.router.navigateByUrl("/home");
  }
  ngOnInit(): void {
  }
  register(){
    let data = this.registerForm.value
    data.mobileNumber = data.mobileNumber.toString()
    this.loginService.postRegister(data).subscribe(res=>{
      console.log(res);
    })
    console.log(data);
    
  }

}
