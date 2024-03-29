import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  private messageSource = new BehaviorSubject('search functionality');
  currentMessage = this.messageSource.asObservable();

  constructor() { }
   changeMessage(message: string) {
    this.messageSource.next(message)
    console.log("message at service: ",message); 
  }
}
