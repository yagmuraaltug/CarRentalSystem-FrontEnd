import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  loginModel:LoginModel
  user:User;
  email = this.localStorageService.getItem('email');
  Authenticated: boolean;
  currentUserId:number;



  constructor(private authService:AuthService,
    private localStorageService:LocalStorageService,
    private userService:UserService,
    private toastrService:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.isAuthenticated();
    this.getEmail();
    this.getUserById()

  }



  isAuthenticated(){
    if (this.authService.isAuthenticated()) {
      this.Authenticated = true;
    } else {
      this.Authenticated = false;
    }
   }

   
  getUserById(){
    this.userService.getUserByUserId(Number(this.localStorageService.getItem('userId'))).subscribe(r=>{
      this.user = r.data
      console.log(this.user)
    })
  }

  getEmail(){
    if(this.email){
      this.userService.getByEmail(this.email).subscribe(response=>{
        this.user = response;
      })
    }
  }

  
  checkToEmail(){
    if(this.localStorageService.getItem('userEmail')){
      return true;
    }else{
      return false;
    }
  }

  
   logOut(){
    this.localStorageService.clean()
     this.toastrService.success("Başarıyla Çıkış Yapıldı");
     this.router.navigate(["/"])
   }
}
