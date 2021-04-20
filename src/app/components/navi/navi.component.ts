import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { LoginModel } from 'src/app/models/loginModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  currentUserEmail: string;
  currentUserId: number;

  userDetails:User;
  customerUser:CustomerDetail = new CustomerDetail();
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private customerService:CustomerService
  ) {}

  ngOnInit(): void {


    let email = this.localStorageService.get("email");
    this.getUser(email == null ? email = "" : email.toString());
    this.getCustomerId(email == null ? email = "" : email.toString());
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

 

  getUser(email:string) {
    this.userService.getByEmail(email).subscribe(response => {
      this.userDetails = response.data;
    })
  }

  getCustomerId(email:string){
      this.customerService.getCustomersByEmail(email == null ? email="" : email).subscribe(
        response => {
          this.customerUser = response.data;
          this.localStorageService.set("customerId", this.customerUser.customerId)
        },
        responseError => { console.log("You are not customer yet.") }
      )
  }
  

  getbyemail() {
    this.userService.getByEmail(this.currentUserEmail).subscribe((response) => {
    });
  }

  getbyId() {
    this.userService
      .getUserByUserId(this.currentUserId)
      .subscribe((response) => {
      });
  }

  getUserName() {
    return this.authService.getUserName();
  }

  logOut() {
    this.localStorageService.clear();
    this.router.navigate(['/homepage']);
  }
}
