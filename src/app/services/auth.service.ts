import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44375/api/auth/';

  constructor(private httpClient: HttpClient) { }

  login(loginModel:LoginModel){
return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel)
 }



  logOut(){
   
  }
 
  isAuthenticated(){
    if(localStorage.getItem("token")){
       return true;

    }else{
      return false;
    }
  }

  

}
