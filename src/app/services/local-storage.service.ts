import { Injectable } from '@angular/core';
import { Customer } from '../models/customer/customer';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  currentCustomer:string;
  constructor() { }

  get(key:string):any {
    return localStorage.getItem(key);
 }


  delete(key:string){
    localStorage.removeItem(key);
  }

  set(key:string, value:any) {
    localStorage.setItem(key, value);
 }

    
  add(key:string, value:any){
    localStorage.setItem(key, value);
  }
 

  clear(){
    localStorage.clear();
  }


  
  setCurrentCustomer(currentCustomerValue:User) {
    localStorage.setItem(this.currentCustomer, JSON.stringify(currentCustomerValue));
  }
  
  getCurrentCustomer(): User {
    var customer = JSON.parse(localStorage.get(this.currentCustomer));
    return customer;
  }
  
  removeCurrentCustomer() {
    localStorage.removeItem(this.currentCustomer);
  }
}