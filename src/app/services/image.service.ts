import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/CarImage';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = "https://localhost:44375/api/carImages/";

  constructor(private httpClient: HttpClient) { }

  getCarImageByCarId(carId: number): Observable<ListResponseModel<CarImage>>{
    let newApi = this.apiUrl + "getimagesbycarid?carId=" + carId;

    return this.httpClient.get<ListResponseModel<CarImage>>(newApi);
  }
}

