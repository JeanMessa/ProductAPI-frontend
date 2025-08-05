
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
        localStorage.setItem("auth-token",value.token);
        localStorage.setItem("username",value.username);
        localStorage.setItem("role",value.role);
      })
    );
  }

  register(userData: FormData){
    return this.httpClient.post(this.APIURL+"/register",userData,{ responseType: 'text' });
  }

}
