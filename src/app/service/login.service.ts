import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { 
  }
  postLogin(data):Observable<any>{
    return this.http.post("https://spotify-chubb.azurewebsites.net/api/User/login",data);
  }
  postRegister(data): Observable<any>{
    return this.http.post("https://spotify-chubb.azurewebsites.net/User/register",data);
  }
  postUserInfo(id):Observable<any>{
    return this.http.post("https://spotify-chubb.azurewebsites.net/api/User/getuserinfo?id="+id,{id:id});
  }
}
