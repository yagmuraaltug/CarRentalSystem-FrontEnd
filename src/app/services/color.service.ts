import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl= "https://localhost:44375/api/colors/";

  constructor(private httpClient:HttpClient) { }

  getColors(): Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl + "getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath)
  }

  getColorsByColorId(colorId:number): Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl + "GetById?colorId=" + colorId;
    return this.httpClient.get<ListResponseModel<Color>>(newPath)
  }

  add(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "add";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
  
  update(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "update";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

  
}
