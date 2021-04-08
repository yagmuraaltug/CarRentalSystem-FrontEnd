
import { CarImage } from "./CarImage";


export class Wallet{
    carId: number;
    customerId: number;
    rentDate: Date;
    returnDate: Date;
    brandName: string;
    colorName: string;
    modelYear: number;
    dailyPrice: number;
    totalPrice: number;

    carName: string;
    imagePath:string;
}

export const Basket: Wallet[] = [];
