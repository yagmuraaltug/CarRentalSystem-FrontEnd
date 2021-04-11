import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:44375/api/users/'
  constructor(private httpClient:HttpClient) { }

  getUserByUserId(userId: number): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(
      this.apiUrl + 'getbyuserid?userId=' + userId
    );
  }
  getByEmail(email:string):Observable<User>{
    return this.httpClient.get<User>(this.apiUrl + 'email?email='+email);
  }
}
