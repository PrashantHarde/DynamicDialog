import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {


private dataSource = new BehaviorSubject(null);
currentMessage = this.dataSource.asObservable();

constructor() { }

changeMessage(data:any) {
  this.dataSource.next(data)
}

}
