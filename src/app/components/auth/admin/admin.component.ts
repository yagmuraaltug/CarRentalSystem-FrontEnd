import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  currentUserEmail: string;
  currentUserId: number;
  userUpdateForm: FormGroup;
  userId:Number
  userDetails:User;
  customer:CustomerDetail = new CustomerDetail();
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private customerService:CustomerService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {


    let email = this.localStorageService.get("email");
    this.getCustomerId(email == null ? email = "" : email.toString());
    this.getUser(email == null ? email = "" : email.toString());
    this.createUserUpdateForm();
  }

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      id:["",Validators.required],
      userName: ["", Validators.required],
      userLastName: ["", Validators.required],
      userEmail: ["", Validators.required],
      password:["", Validators.required],
    });
  }

  updateUserInfos(){
    this.userUpdateForm.patchValue({ id: this.userDetails.userId })
    if(this.userUpdateForm.valid){
      let userModel = Object.assign({},this.userUpdateForm.value);
      this.userService.update(userModel).subscribe(
        response => {
        this.toastrService.success(response.message,"Successful")
        this.localStorageService.set("email", this.userUpdateForm.get("email")?.value)
        setTimeout(() => { window.location.reload(); });
        },
        responseError => {
        if(responseError.error.ValidationErrors.length > 0) {
          for(let i=0;i<responseError.error.ValidationErrors.length;i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error")
          }
        }
      })
    }
    else {
      this.toastrService.error("The form is missing.","Attention!")
    }
  }

  getUser(email:string) {
    this.userService.getByEmail(email).subscribe(response => {
      this.userDetails = response.data;
    })
  }

  getCustomerId(email:string){
      this.customerService.getCustomersByEmail(email == null ? email="" : email).subscribe(
        response => {
          this.customer = response.data;
          this.localStorageService.set("customerId", this.customer.customerId)
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

  
}
  
