import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
  
})
export class RentalService {
  apiUrl = 'https://localhost:44375/api/rentals/';
  rental:Rental;
  totalPrice:number = 0;


  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newApiUrl = this.apiUrl + 'getrentaldetails';
    return this.httpClient.get<ListResponseModel<Rental>>(newApiUrl);
  }

  AvailableCars(carId: number): Observable<boolean> {
    let newApiUrl = this.apiUrl + 'iscaravailable?carId=' + carId;

    return this.httpClient.get<boolean>(newApiUrl);
  }


  addRental(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,rental);
}

getRentalTotalPrice(){
  return this.totalPrice;
}


setRental(rental:Rental){
  this.rental = rental;
}

getRentalCar() {
  return this.rental;
}

goToPayment(rental: Rental) {
  this.rental = rental;
}


}
