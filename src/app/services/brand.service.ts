import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandResponseModel } from '../models/brand/brandResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = 'https://localhost:44375/api/brands/getall ';

  constructor(private httpClient: HttpClient) { }

  getBrands():Observable<BrandResponseModel>{
     return this.httpClient.get<BrandResponseModel>(this.apiUrl)
   
  }
}
