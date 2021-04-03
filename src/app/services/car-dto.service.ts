import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDtoServiceService {

  apiUrl = "https://localhost:44375/api/cars/";
  constructor(private httpClient: HttpClient) {}
  
  getCarDetailsByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "cars/getCarDetailsByCarId?carId=" + carId;
     return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
}
