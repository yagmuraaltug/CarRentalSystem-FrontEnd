import { Car } from "../car/car";
import { CarImage } from "../CarImage";


export interface CarDto{
    car : Car;
    carImage: CarImage[];
}