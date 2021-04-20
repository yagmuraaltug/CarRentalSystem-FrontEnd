import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaims';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:44375/api/Users/';

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private httpClient: HttpClient,
    private localStoregeService: LocalStorageService
  ) {}

  getUserByUserId(userId: number): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(
      this.apiUrl + 'getbyuserid?userId=' + userId
    );
  }

  getByEmail(email: string): Observable<SingleResponseModel<User>> {
    return this.httpClient.get<SingleResponseModel<User>>(
      this.apiUrl + 'GetByEmail?email=' + email
    );
  }
  update(userModel:User):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update", userModel)
  }
 

  getClaims(userId: number): Observable<ListResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + 'getClaimsByUserId?userId=' + userId;
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }

  CheckIfIsAdmin(userId: number): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'checkIfIsAdmin?userId=' + userId;
    return this.httpClient.get<ResponseModel>(newPath);
  }
}
