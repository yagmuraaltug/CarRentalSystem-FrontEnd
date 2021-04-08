import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car/car';

@Pipe({
  name: 'filterCar'
})
export class FilterCarPipe implements PipeTransform {

  transform(value: Car[], filterCar:string): Car[] {
    filterCar=filterCar?filterCar.toLocaleLowerCase():""
    return filterCar?value.filter((car:Car)=>car.brandName.toLocaleLowerCase().indexOf(filterCar)!==-1):value;
  }

  }


