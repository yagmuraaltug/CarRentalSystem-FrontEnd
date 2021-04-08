import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CarImage } from 'src/app/models/CarImage';
import { Customer } from 'src/app/models/customer/customer';
import { Rental } from 'src/app/models/rental/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CarImageService } from 'src/app/services/image.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.css'],
})
export class RentalDetailsComponent implements OnInit {

  rentalAddForm:FormGroup;
  customersDetails : Customer[];
  carDetail: Car;

  rentDate: Date;
  returnDate: Date;
  totalPrice:number;

  carImages : CarImage[];

  constructor(private rentalService:RentalService,
    private formBuilder:FormBuilder,
    private activetedRoute:ActivatedRoute,
    private customerService:CustomerService,
    private carService:CarService,
    private carImageService:CarImageService,
    private walletService:WalletService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createRentalAddForm();
    this.getCustomersDetail();

    this.activetedRoute.params
      .subscribe((param) => {
        if(param["carId"]){
          this.getCarDetailByCarId(param["carId"]);
        }
      })

      this.getCarImagesCarId();
  }

  getCustomersDetail(){
    this.customerService.getCustomers()
      .subscribe((response) => {
        this.customersDetails = response.data;
      })
  }

  getCarDetailByCarId(carId: number){
    this.carService.getCarDetailsByCarId(carId)
    .subscribe((response) => {
      this.carDetail = response.data[0];
    });
  }

  getCarImagesCarId(){
    this.carImageService.getCarImageByCarId(this.activetedRoute.snapshot.params["carId"])
      .subscribe((response)=> {
        this.carImages = response.data;
      })
  }

  createRentalAddForm(){
    this.rentalAddForm = this.formBuilder.group({
      carId: [""],
      customerId:["", Validators.required],
      rentDate:["", Validators.required],
      returnDate:[""],
    });
  }

  addToCart(){
    if(this.rentalAddForm.valid){

      let rentalModel = Object.assign({}, this.rentalAddForm.value);
      rentalModel.carId = this.carDetail.id;
      rentalModel.brandName = this.carDetail.brandName;
      rentalModel.colorName = this.carDetail.colorName;
      rentalModel.description = this.carDetail.description;
      rentalModel.modelYear = this.carDetail.modelYear;
      rentalModel.dailyPrice = this.carDetail.dailyPrice;
      rentalModel.totalPrice = this.totalPrice;
      rentalModel.carImages = this.carImages;

      //Araç kiralama bilgilerinin eklenmesi
      rentalModel.rentDate = this.rentalAddForm.value.rentDate;
      rentalModel.returnDate = this.rentalAddForm.value.returnDate;
      rentalModel.customerId = this.rentalAddForm.value.customerId;
      this.rentalService.setRental(rentalModel);

      //Sepete eklenmesi
      this.walletService.addToCart(rentalModel);
      this.toastrService.info("Sepete eklendi", this.carDetail.brandName);
    }
    else{
      this.toastrService.error("Lütfen ilgili yerleri doldurunuz", "Hata!");
    }

  }

  calculateTotalPrice(){
    let startDate = new Date(this.rentalAddForm.value.rentDate);
    let endDate = new Date(this.rentalAddForm.value.returnDate);

    if( isNaN(startDate.getTime()) || isNaN(endDate.getTime()) ){
      this.totalPrice = 0;
    }
    else if(startDate > endDate){
      this.totalPrice = 0;
    }
    else{
      let dateDiff = Math.floor((endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24);
      this.totalPrice = dateDiff * this.carDetail.dailyPrice;
    }
  }
}