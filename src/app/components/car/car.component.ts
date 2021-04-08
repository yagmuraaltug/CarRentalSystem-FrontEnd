import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { CarDto } from 'src/app/models/car-dto/car-dto';
import { Car } from 'src/app/models/car/car';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { CarDtoComponent } from '../car-dto/car-dto.component';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = [];
  filterCar="";

  brandId:number =0;
  colorId:number =0;
  brands: Brand[] = [];
  colors:Color[] =[];
  currentBrand:Brand;


  constructor(private carService:CarService, private activatedRoute:ActivatedRoute, 
    private brandService:BrandService,private colorService:ColorService,private toastrService:ToastrService
    ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) =>{
     if(params["brandId"]){
       this.getCarsByBrandId(params["brandId"])
     }
     else if(params["colorId"]){
      this.getCarsByColor(params["colorId"])

     }
     else{
       this.getCars();
     }
     this.getBrands();
     this.getColors();

    })
  }

  getCars(){
         this.carService.getCars().subscribe(response =>{
           this.cars = response.data;
         })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(respone => {
      this.brands = respone.data;
    })
  }



  getColors(){
    this.colorService.getColors().subscribe(respone => {
      this.colors = respone.data;
    })
  }

  
  
  getCarsByBrandId(brandId:number){
    this.carService.getCarsByBrandId(brandId).subscribe(response =>{
      this.cars = response.data;

    })
  }

  setSelectedBrandId(brandId:number){
    if(this.brandId == brandId){
      return true;
    }else{
      return false;
    }
  }





  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response =>{
      this.cars = response.data;

    })
  }

  getCarsByFilter(brandId:number,colorId:number){
    this.carService.getCarsByFilter(brandId,colorId).subscribe(response=>{
      this.cars=response.data;
  
    
      
    });
  }

}

