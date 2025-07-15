
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../../types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly APIURL:string = "http://localhost:8080/user";

  constructor(private httpClient:HttpClient){}
  
  login(username:string,password:string){
    return this.httpClient.post<LoginResponse>(this.APIURL+"/login",{username,password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token",value.token);
        sessionStorage.setItem("username",value.username)
      })
    );
  }
}
