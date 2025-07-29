import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyInputComponent } from "../currency-input/currency-input.component";

@Component({
  selector: 'product-form',
  imports: [ReactiveFormsModule, CurrencyInputComponent],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  productForm!: FormGroup;
  @Input() title = '';
  @Output() save = new EventEmitter;
  @ViewChild("currencyInput") currencyInput!: CurrencyInputComponent; 
  
  constructor(){
    this.productForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
    });
  }

  isFormComplete(){      
    return this.productForm.valid && this.currencyInput.getPrice() > 0;
  }

  onSave(){
    const name = this.productForm.value.name;
    const price = this.currencyInput.getPrice();    
    this.save.emit({name,price});
  }

  reset(){
    this.productForm.reset();
    this.currencyInput.reset();
  }
}
