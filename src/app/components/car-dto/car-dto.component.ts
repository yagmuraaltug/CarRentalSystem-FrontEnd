import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-car-dto',
  templateUrl: './car-dto.component.html',
  styleUrls: ['./car-dto.component.css']
})
export class CarDtoComponent implements OnInit {

  cars: Car[]=[] ;
  car:Car;
  images: CarImage[] = [];
  CarsAvailable: boolean;
  showAlert:boolean = false;
  rental: Rental;
  rentDate: Date;
  returnDate: Date;
  customerId: number;
  isRented: boolean = false;
 

  

  constructor(private activatedRoute: ActivatedRoute,
    private carService:CarService,
    private CarImageService:CarImageService,
    private rentalService:RentalService,
  
    ) { } 

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
       if (params['carId']) {
          this.getCarDetailsByCarId(params["carId"]);
          this.getCarImageByCarId(params["carId"]);
          this.AvailableCars(params["carId"]);


       }

    });

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
  this.rental.customerId = this.customerId;

  localStorage.setItem("rentDetail",JSON.stringify(this.rental));
  localStorage.setItem("rental",JSON.stringify(this.car));

}

}
