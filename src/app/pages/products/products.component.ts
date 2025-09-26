import {Component, OnInit, ViewChild} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Observable } from 'rxjs';
import { Product } from '../../../types/product.type';
import { ProductService } from '../../services/product.service';
import { AsyncPipe, CurrencyPipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CurrencyInputComponent } from "../../components/currency-input/currency-input.component";
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from "../../components/confirm-dialog/confirm-dialog.component";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-products',
  imports: [HeaderComponent, AsyncPipe, CurrencyPipe, FormsModule, CurrencyInputComponent, ConfirmDialogComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{

  products$! :Observable<Product[]>;
  productName:string = '';
  @ViewChild('minPrice') minPrice!: CurrencyInputComponent; 
  @ViewChild('maxPrice') maxPrice!: CurrencyInputComponent;
  @ViewChild('deleteDialog') deleteDialog!: ConfirmDialogComponent; 
  productToDelete:string = "";
  isFiltered:boolean = false; 
  role:string | null = localStorage.getItem("role");

  constructor(private productService:ProductService, private router:Router, private toastService:ToastrService){}

  ngOnInit(): void {    
    this.list();
  }

  list(){
    this.products$ = this.productService.getAll();   
    this.isFiltered = false; 
  }

  filter(){
    if(this.productName || this.minPrice.getPrice()>0 || this.maxPrice.getPrice()>0){
      this.products$ = this.productService.getAllFiltered(this.productName,this.minPrice.getPrice(),this.maxPrice.getPrice());
      this.isFiltered = true;
    }else{
      this.list();
    }
  }

  edit(productId:string){
    this.router.navigate(["produtos/editar/"+productId])
  }

  deleteConfirmation(productId:string,name:string){
    this.deleteDialog.modalBody = `Tem certeza que deseja excluir o produto ${name}? Essa ação é irreversível.`
    this.productToDelete = productId;
  }

  delete(productId:string){
    console.log(productId);
    
    this.productService.delete(productId).subscribe({
      next: () => {
        this.toastService.success("Produto excluido com sucesso.")
        this.filter()
      },
      error: () => this.toastService.error("Erro ao excluir.")
    })
    
  }

}
