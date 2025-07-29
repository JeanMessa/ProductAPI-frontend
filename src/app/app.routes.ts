import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProductsComponent } from './pages/products/products.component';
import { CreateProductsComponent } from './pages/create-products/create-products.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent,
        canActivate: [AuthGuardService],
        data:{
            requireNotAuthenticated: true
        }
    },
    {
        path: "",
        component: ProductsComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "produtos",
        component: ProductsComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: "produtos/cadastro",
        component: CreateProductsComponent,
        canActivate: [AuthGuardService],
        data:{
            requireAdmin: true
        }
    },
];
