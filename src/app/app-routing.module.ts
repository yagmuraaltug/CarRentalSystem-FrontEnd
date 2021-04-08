import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddUpdateComponent } from './components/brand/brand-add-update/brand-add-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDtoComponent } from './components/car-dto/car-dto.component';
import { CarUpdateComponent } from './components/car/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color/color-add/color-add.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalDetailsComponent } from './components/rental-details/rental-details.component';
import { WalletComponent } from './components/wallet/wallet.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/details/:carId", component:CarDtoComponent},
  {path:"rentals/add/:carId", component:RentalDetailsComponent},
  {path:"cars/add", component:CarAddComponent},
  {path:"colors/add", component:ColorAddComponent},
  {path:"cars/update/:carId", component:CarUpdateComponent},
  {path:"brands/update/:brandId", component:BrandAddUpdateComponent},
  {path:"colors/update/:colorId", component:ColorAddComponent},
  {path:"brands/add", component:BrandAddUpdateComponent},
  {path: "wallet", component: WalletComponent},
  {path:"payment", component:PaymentComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
