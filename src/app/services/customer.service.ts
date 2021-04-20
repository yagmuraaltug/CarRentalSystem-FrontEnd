import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer/customer';
import { CustomerDetail } from '../models/customerDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

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
      let newPath = this.apiUrl + 'getCustomerById?userId=' + userId;
      return this.httpClient.get<ListResponseModel<Customer>>(newPath);
    }

    getCustomersByEmail(email:string):Observable<SingleResponseModel<CustomerDetail>> {
      return this.httpClient.get<SingleResponseModel<CustomerDetail>>(this.apiUrl + "getbyemail?email=" + email);
    }
}
