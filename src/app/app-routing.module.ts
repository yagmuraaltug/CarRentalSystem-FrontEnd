import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/auth/admin/admin.component';
import { BrandAddUpdateComponent } from './components/brand/brand-add-update/brand-add-update.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { CarDtoComponent } from './components/car/car-dto/car-dto.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/auth/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RentalDetailsComponent } from './components/rental/rental-details/rental-details.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { LoginGuard } from './guards/login.guard';
import { ProfileEditComponent } from './components/auth/profile-edit/profile-edit.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/details/:carId", component:CarDtoComponent},
  {path:"rentals/add/:carId", component:RentalDetailsComponent, canActivate: [LoginGuard]},
  {path:"cars/details", component:CarAddComponent, canActivate: [LoginGuard]},
  {path:"colors/details", component:ColorAddComponent, canActivate: [LoginGuard]},
  {path:"cars/update/:carId", component:CarUpdateComponent, canActivate: [LoginGuard]},
  {path:"brands/details", component:BrandAddUpdateComponent, canActivate: [LoginGuard]},
  {path:"colors/details", component:ColorAddComponent, canActivate: [LoginGuard]},
  {path:"brands/details", component:BrandAddUpdateComponent, canActivate: [LoginGuard]},
  {path: "wallet", component: WalletComponent,canActivate: [LoginGuard]},
  {path:"login", component:LoginComponent},
  {path:"logOut", component:LoginComponent},
  {path:"payment", component:PaymentComponent, canActivate: [LoginGuard]},
  {path:"register", component:RegisterComponent},
  {path:"getCarDetails", component:CarComponent},
  {path:"homepage", component:HomepageComponent},
  {path:"profile", component:AdminComponent},
  {path:"profile-edit", component:ProfileEditComponent},



  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
