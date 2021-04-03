import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarImageService } from 'src/app/services/image.service';
import { CarImage } from 'src/app/models/CarImage';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-dto',
  templateUrl: './car-dto.component.html',
  styleUrls: ['./car-dto.component.css']
})
export class CarDtoComponent implements OnInit {

  cars: Car[] = [];
  images: CarImage[] = [];
  

  constructor(private activatedRoute: ActivatedRoute,
    private carService:CarService,
    private CarImageService:CarImageService
    
    ) { } 

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
       if (params['carId']) {
          this.getCarDetailsByCarId(params["carId"]);
          this.getCarImageByCarId(params["carId"]);

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
}
