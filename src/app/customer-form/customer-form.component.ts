import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  public formGroup!: FormGroup;
  public productDetails: any = '';
  data:any = [];
  subscription!: Subscription;
  constructor(private formBuilder: FormBuilder, private service: DataServiceService) { }

  ngOnInit(): void {
    this.subscription = this.service.currentMessage.subscribe(message => this.data = message)
    this.createForm(this.data[0]);
  }

  createForm(obj:any) {
    this.formGroup = this.formBuilder.group({
      'firstname': [obj.firstname],
      'lastname': [obj.lastname],
      'email': [obj.email],
      'gender': [obj.gender],
      'birthdate': [obj.birthdate],
      'street': [obj.street],
      'city': [obj.city],
      'postcode': [obj.postcode],
      'state': [obj.state],
      'country': [obj.country],
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(product: any) {
    this.productDetails = product;
  }

}
