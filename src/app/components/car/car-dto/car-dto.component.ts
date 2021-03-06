import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarImageService } from 'src/app/services/image.service';
import { CarImage } from 'src/app/models/CarImage';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { Customer } from 'src/app/models/customer/customer';
import { Rental } from 'src/app/models/rental/rental';
import { CarDto } from 'src/app/models/car-dto/car-dto';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CustomerDetail } from 'src/app/models/customerDetail';

@Component({
  selector: 'app-car-dto',
  templateUrl: './car-dto.component.html',
  styleUrls: ['./car-dto.component.css']
})
export class CarDtoComponent implements OnInit {

  customer : Customer ;
  customerDetails : Customer[];
  cars: Car[]=[] ;
  car:Car;
  images: CarImage[] = [];
  CarsAvailable: boolean;
  showAlert:boolean = false;
  rental: Rental;
  rentDate: Date;
  returnDate: Date;
  customerId: number;
  customers:CustomerDetail = new CustomerDetail();

 

  

  constructor(private activatedRoute: ActivatedRoute,
    private carService:CarService,
    private CarImageService:CarImageService,
    private rentalService:RentalService,
    private toastrService:ToastrService,
    private customerService:CustomerService,
    private router:Router,
    private localStorageService:LocalStorageService,
  
    ) { } 

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
       if (params['carId']) {
          this.getCarDetailsByCarId(params["carId"]);
          this.getCarImageByCarId(params["carId"]);
          this.AvailableCars(params["carId"]);


       }

       
       

    });
    let email = this.localStorageService.get("email");
    this.getCustomerId(email == null ? email = "" : email.toString());

  }

  getCarDetailsByCarId(carId:number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
       this.cars = response.data;
    });
 }

 getCarImageByCarId(carId:number){
  this.CarImageService.getCarImageByCarId(carId).subscribe((response) => {
    this.images = response.data;
 });
 }

 getSliderClassName(index: Number) {
  if (index == 0) {
    return 'carousel-item active';
  } else {
    return 'carousel-item';
  }
}

getCustomerId(email:string){
  this.customerService.getCustomersByEmail(email == null ? email="" : email).subscribe(
    response => {
      this.customers = response.data;
      this.localStorageService.set("customerId", this.customers.customerId)
    },
    responseError => { console.log("You are not customer yet.") }
  )
}
AvailableCars(carId:number){
  this.rentalService.AvailableCars(carId)
    .subscribe((response) => {
      this.CarsAvailable = response;
    }, responseEror => {
      this.showAlert = true;
    })

}
createRental() {
  this.rental.carId = this.car.id;
  this.rental.returnDate = this.returnDate;
  this.rental.rentDate = this.rentDate;

  localStorage.setItem("rentDetail",JSON.stringify(this.rental));
  localStorage.setItem("rental",JSON.stringify(this.car));

}
  
}