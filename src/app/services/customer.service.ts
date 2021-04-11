import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer/customer';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

    apiUrl = 'https://localhost:44375/api/customers/';
    constructor(private httpClient : HttpClient) { }
  
    
    
    getCustomers(): Observable<ListResponseModel<Customer>>{
      let newPath = this.apiUrl + "getall";
      return this.httpClient.get<ListResponseModel<Customer>>(newPath)
    }

    getCustomerByUserId(userId: number): Observable<ListResponseModel<Customer>> {
      let newPath = this.apiUrl + 'customers/getCustomerByUserId?userId=' + userId;
      return this.httpClient.get<ListResponseModel<Customer>>(newPath);
    }

    
getCustomerFindexNote(customerId:number){
  let newPath=this.apiUrl+"customers/getFindexNote?customerId=" + customerId;
  return this.httpClient.get(newPath)
}
}
