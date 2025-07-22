import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../types/product.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly APIURL = "http://localhost:8080/product";

  constructor(private httpClient:HttpClient){}
  
  getAll(){    
      console.log("teste");
    return this.httpClient.get<Product[]>(this.APIURL);
  }

}
