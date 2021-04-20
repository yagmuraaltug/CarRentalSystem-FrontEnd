import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { Card } from 'src/app/models/card';
import { Rental } from 'src/app/models/rental/rental';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentAddForm:FormGroup;
  totalPrice:number;
  customerId:number;
  payment:boolean
  cardId: number;
  cardHolderName:string
  cardNo:string
  expirationDate:string
  cvc:string
  isCheck=false;
  cardto:Car
  rental:Rental;
  saveCard:boolean;
  cards: Card[];

  constructor(private formBuilder:FormBuilder,
    private paymentService:PaymentService,
    private toastrService:ToastrService,
    private rentalService:RentalService,
    private router:Router) { }

  ngOnInit(): void {

 

    this.createPaymentAddForm();

  }

  createPaymentAddForm(){
    this.paymentAddForm = this.formBuilder.group({
      cardHolderName:["",Validators.required],
      cardNumber: ["",Validators.required],
      cardExpirationDate :["", Validators.required],
      cardCvv:["",Validators.required],
      saveCard:[""]

    })
  }

  addPayment(){
    if(this.paymentAddForm.valid){
      let paymentModel = Object.assign({},this.paymentAddForm.value)
        paymentModel.cardHolderName= this.cardHolderName,
        paymentModel.cardNo = this.cardNo,
        paymentModel.expirationDate = this.expirationDate,
        paymentModel.cvc = this.cvc
        this.paymentService.payment(paymentModel, this.payment);
        this.toastrService.success("The payment succesfully taken!","Succesful")
        this.router.navigate(['/'])
    } else {
        this.toastrService.error("Sorry there is a problem please, check again!","Error");
    }
  }

  

  setCurrentCard(card:Card){
    this.paymentAddForm.setValue({
      cardOwnerName : card.CardHolderName,
      cardNumber : card.cardNumber,
      cardExpirationDate : card.cardExpirationDate,
      cardCvv : card.cardCvv,
      saveCard : false,
    })
    this.cardId = card.id
  }
  
  
   
  }

  
