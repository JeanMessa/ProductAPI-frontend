import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { App } from './app';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        canActivate: [AuthGuardService],
        data:{
            requireNotAuthenticated: true
        }
    }

];
