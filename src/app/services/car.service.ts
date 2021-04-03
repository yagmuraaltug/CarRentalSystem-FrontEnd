import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDto } from '../models/car-dto/car-dto';
import { Car } from '../models/car/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl = "https://localhost:44375/api/cars/";

  constructor(private httpClient: HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "getcarDetails"
     return this.httpClient.get<ListResponseModel<Car>>(newPath)
   
  }

  getCarDetailsByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + "getCarDetailsByCarId?carId=" + carId;
     return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>>{
  let newPath = this.apiUrl + "GetCarsByBrandId?brandId=" + brandId;
  return this.httpClient.get<ListResponseModel<Car>>(newPath);  
}

getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
  let newPath = this.apiUrl + "GetCarsByColorId?colorId=" + colorId;
  return this.httpClient.get<ListResponseModel<Car>>(newPath);  
}
}
