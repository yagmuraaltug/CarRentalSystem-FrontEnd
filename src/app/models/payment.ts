import { Car } from "./car/car";
import { Card } from "./card";

export interface Payment{
    id: number;
    customerId:number;
    cardHolderName:string;
    cardNumber:string;
    cardExpirationDate:string;
    cardCvv:number;
    paymentDate:Date;
    totalPayment:number;
  }