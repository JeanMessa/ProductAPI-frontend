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

  username:string | null = localStorage.getItem('username');
  isAdmin:boolean = localStorage.getItem('role') == "ADMIN";

  constructor(private router:Router){}

  logout(){
    localStorage.removeItem('auth-token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(["/login"])
  }
}
