import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { ProductFormComponent } from '../product-form/product-form.component';

export interface UsersData {
  id: number;
  product: string;
  customer: string;
  email: string;
  price: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'product', 'customer', 'email', 'price', 'action' ];

  public dataSource: UsersData[] = [
    {id: 1, product: 'Ebook-1234', customer:'James Erick',email:'jameserick@gmail.com', price:'200.00$'},
    {id: 2, product: 'Ebook-5678', customer:'Emma Watson',email:'emmawatsonk@gmail.com', price:'150.00$'},
    {id: 3, product: 'Ebook-9012', customer:'John Henry',email:'johnhenry@gmail.com', price:'120.00$'},
    {id: 4, product: 'Ebook-3456', customer:'Carl Page',email:'carlpage@gmail.com', price:'130.00$'},
    {id: 5, product: 'Ebook-7890', customer:'Bruce Wayne',email:'brucewayne@gmail.com', price:'140.00$'},
  ];
  
  public customerData:any[] = [
    {id:1, firstname:'James',lastname:'Erick', email:'jameserick@gmail.com', gender:'Male',birthdate:'12-09-1995', street:'abc street', city:'Mumbai', postcode:'413706', state:'Texas', country:'USA' },
    {id:2, firstname:'Emma',lastname:'Watson', email:'emmawatsonk@gmail.com', gender:'Female',birthdate:'25-01-1998', street:'kbc street',city:'Kolkata', postcode:'410906', state:'California', country:'USA' },
    {id:3, firstname:'John',lastname:'Henry', email:'johnhenry@gmail.com', gender:'Male',birthdate:'01-04-1992', street:'xyz street', city:'Bangalore', postcode:'420087', state:'Punjab', country:'India' },
    {id:4, firstname:'Carl',lastname:'Page', email:'carlpage@gmail.com', gender:'Male',birthdate:'15-02-1975', street:'pqr street', city:'Pune' , postcode:'434445', state:'Tokyo', country:'Japan' },
    {id:5, firstname:'Bruce',lastname:'Wayne', email:'brucewayne@gmail.com', gender:'Male',birthdate:'29-06-1980', street:'stp street', city:'Indore' ,postcode:'444546', state:'Paris', country:'France' },
  ]

  public productData:any[]=[
    {id:1,productname:"Ebook-1234", price:'200.00$', description:'It is a xyz product', qty: 15 },
    {id:2,productname:"Ebook-5678", price:'150.00$', description:'It is a abc product', qty: 20 },
    {id:3,productname:"Ebook-9012", price:'120.00$', description:'It is a pqr product', qty: 12 },
    {id:4,productname:"Ebook-3456", price:'130.00$', description:'It is a stq product', qty: 18 },
    {id:5,productname:"Ebook-7890", price:'140.00$', description:'It is a mno product', qty: 14 },
  ]

  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;

  constructor(public dialog: MatDialog, ) { }

  ngOnInit(): void {
    
  }

  openProductDialog(id:number, selectedId:number, action:string) {
    const filterData = id == 1 ? this.customerData : id == 3 ? this.productData : this.dataSource;
    const passData = filterData.filter(item => item['id'] == selectedId);
    let dialogRef = this.dialog.open(DialogBoxComponent, {
      data: { component: ProductFormComponent, id:id, formData:passData , action:action }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("res->", result);
    });
  }

  openCustomerDialog(id:number, selectedId:number, action:string) {
    const filterData = id == 1 ? this.customerData : id == 3 ? this.productData : this.dataSource;
    const passData = filterData.filter(item => item['id'] == selectedId);
    let dialogRef = this.dialog.open(DialogBoxComponent, {
      data: { component: CustomerFormComponent, id:id, formData:passData, action:action  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("res->", result);
    });
  }

  openEditFormDialog(id:number, selectedId:number, action:string) {
    const filterData = id == 1 ? this.customerData : id == 3 ? this.productData : this.dataSource;
    const passData = filterData.filter(item => item['id'] == selectedId);
    let dialogRef = this.dialog.open(DialogBoxComponent, {
      data: { component: EditFormComponent, id:id, formData:passData, action:action  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result->", result);
    });
  }

  deleteRowData(itemId:number){
    this.dataSource.forEach((element:any, index:number) => {
      if (element.id == itemId) {
        this.dataSource.splice(index,1);
      }
    });
  }

}
