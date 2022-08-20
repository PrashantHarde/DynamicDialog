import { Component, ComponentFactoryResolver, ComponentRef, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataServiceService } from '../service/data-service.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  @ViewChild('target', { read: ViewContainerRef, static: true }) vcRef!: ViewContainerRef;

  componentRef!: ComponentRef<any>;
  public viewId:number = 0;
  public getData:any = [];
  public currentAction:any;
  

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private resolver: ComponentFactoryResolver,private service: DataServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.viewId = Number(data.id);
      this.getData = data.formData;
      this.currentAction = data.action;
      this.service.changeMessage(this.getData);
     }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.vcRef.createComponent(factory);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
