import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  public formGroup!: FormGroup;
  public productDetails:any = '';
  subscription!: Subscription;
  public data:any = [];
  constructor(private formBuilder: FormBuilder, private service:DataServiceService) { }

  ngOnInit(): void {
    this.subscription = this.service.currentMessage.subscribe(item => this.data = item)
    this.createForm(this.data[0]);
  }

  createForm(obj:any) {
    this.formGroup = this.formBuilder.group({
      'productname': [obj.productname],
      'price': [obj.price],
      'description': [obj.description],
      'qty': [obj.qty],
    });
  }

  onSubmit(product:any) {
    this.productDetails = product;
  }

}
