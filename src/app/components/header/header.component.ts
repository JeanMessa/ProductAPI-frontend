import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  username:string | null = sessionStorage.getItem('username');
  isAdmin:boolean = sessionStorage.getItem('role') == "ADMIN";

  constructor(private router:Router){}

  logout(){
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    this.router.navigate(["/login"])
  }
}
