import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Observable } from 'rxjs';
import { Product } from '../../../types/product.type';
import { ProductService } from '../../services/product.service';
import { AsyncPipe, CurrencyPipe, DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-products',
  imports: [HeaderComponent,AsyncPipe,CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  products$! :Observable<Product[]>;

  constructor(private productService:ProductService){}

  ngOnInit(): void {    
    this.list();
  }

  list(){
    this.products$ = this.productService.getAll();    
  }


}
