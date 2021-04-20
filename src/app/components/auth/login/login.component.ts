import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { LoginModel } from 'src/app/models/loginModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginModel: LoginModel;
  email: string;
  userFindeks: number;
  currentCustomer: Customer;
  currentCustomerEmail: string;
  user: User;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if(this.loginForm.valid) {

      let loginModel = Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(
        response => {
          this.toastrService.success("Login successfully.")
          this.localStorageService.set("token", response.data.token)
          this.localStorageService.set("email", this.loginForm.get("email")?.value)
          setTimeout(() => { this.router.navigate(['/cars']) }, 1000);
        },
        responseError => {
          this.toastrService.error(responseError.error)
        })
      }
  }

  getByMail(mail: string) {
    this.userService.getByEmail(mail).subscribe((response) => {
      this.user = response.data;
    });
  }
}
