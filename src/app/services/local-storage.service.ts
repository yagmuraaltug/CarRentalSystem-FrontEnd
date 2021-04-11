import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorage: Storage;
  currentUser: string = "currentUser";


  constructor() { 
     this.localStorage = window.localStorage;
  }
  getItem(key : string){
    return localStorage.getItem(key)
  }

  setItem(key: string, value: string){
    localStorage.setItem(key, value)
  }

  clean(){
    localStorage.clear()
  }

  removeItem(key: string){
    localStorage.removeItem(key)
  }
  setUser(email:string){
    localStorage.setItem(this.currentUser,JSON.stringify(email));
  }

  getUser(){
    return JSON.parse(localStorage.getItem(this.currentUser) ||'{}');
  }

  removeUser(){
    localStorage.removeItem(this.currentUser);
  }

  
  setCurrentCustomer(currenUserValue: User) {
    localStorage.setItem(this.currentUser, JSON.stringify(currenUserValue));
  }
  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem(this.currentUser)!);
  }
}
