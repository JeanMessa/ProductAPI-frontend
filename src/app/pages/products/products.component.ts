import {Component, OnInit, ViewChild} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Observable } from 'rxjs';
import { Product } from '../../../types/product.type';
import { ProductService } from '../../services/product.service';
import { AsyncPipe, CurrencyPipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyInputComponent } from "../../components/currency-input/currency-input.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  imports: [HeaderComponent, AsyncPipe, CurrencyPipe, FormsModule, CurrencyInputComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  products$! :Observable<Product[]>;
  productName:string = '';
  @ViewChild('minPrice') minPrice!: CurrencyInputComponent; 
  @ViewChild('maxPrice') maxPrice!: CurrencyInputComponent; 

  constructor(private productService:ProductService, private router:Router){}

  ngOnInit(): void {    
    this.list();
  }

  list(){
    this.products$ = this.productService.getAll();    
  }

  filter(){
    this.products$ = this.productService.getAllFiltered(this.productName,this.minPrice.getPrice(),this.maxPrice.getPrice()); 
  }

  edit(productId:string){
    this.router.navigate(["produtos/editar/"+productId])
  }

}
