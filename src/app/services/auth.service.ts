import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userEmail: string;
  userName: string;
  userId: number;

  jwtHelper: JwtHelperService = new JwtHelperService();
  apiUrl = 'https://localhost:44375/api/auth/';
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(loginModel: LoginModel) {
    let newPath = this.apiUrl + 'login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      loginModel
    );
  }

  
  register(registerModel:RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", registerModel)
  }
  
  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  setUserEmail() {
    if (this.localStorageService.get('token')) {
      var decoded = this.jwtHelper.decodeToken(
        this.localStorageService.get('token')
      );
      var newUserEmail = Object.keys(decoded).filter((u) =>
        u.endsWith('/nameidentifier')
      )[0];
      this.userEmail = String(decoded[newUserEmail]);
    }
  }

  setUserId() {
    if (this.localStorageService.get('token')) {
      var decoded = this.jwtHelper.decodeToken(
        this.localStorageService.get('token')
      );
      var newUserId = Object.keys(decoded).filter((u) =>
        u.endsWith('/nameidentifier')
      )[0];
      this.userId = Number(decoded[newUserId]);
    }
  }

  getUserEmail(): string {
    return this.userEmail;
  }

  getUserId(): number {
    return this.userId;
  }

  getUserName() {
    var decoded = this.jwtHelper.decodeToken(
      this.localStorageService.get('token')
    );
    var propUserName = Object.keys(decoded).filter((u) =>
      u.endsWith('/name')
    )[0];
    return decoded[propUserName];
  }
}
