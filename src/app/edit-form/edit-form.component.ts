import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

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
      'productname': [obj.product, Validators.required],
      'customer': [obj.customer, Validators.required],
      'price': [obj.price, Validators.required],
    });
  }

  onSubmit(product:any) {
    this.productDetails = product;
  }

}
