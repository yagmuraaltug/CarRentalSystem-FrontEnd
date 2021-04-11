import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  cardId: number;

  rentalInfo:Rental;
  saveCard:boolean;



  cards: Card[];

  constructor(private formBuilder:FormBuilder,
    private paymentService:PaymentService,
    private toastrService:ToastrService,
    private rentalService:RentalService) { }

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

      let paymentModel = Object.assign({}, this.paymentAddForm.value);
      paymentModel.customerId = this.customerId;
      paymentModel.total = this.totalPrice;
      paymentModel.cardId = this.customerId + this.totalPrice;
      paymentModel.paymentDate = new Date().toISOString().slice(0,10);

      if(typeof(paymentModel.cardId) === "string"){
        paymentModel.cardId = parseInt(paymentModel.cardId);
      }

      if(typeof(paymentModel.customerId) === "string"){
        paymentModel.customerId = parseInt(paymentModel.customerId);
      }

      this.paymentService.payment(paymentModel, this.saveCard)
        .subscribe((response) => {
          this.toastrService.success(response.message, "Payment successfully finished ! Thank you!");

          this.rentalService.addRental(this.rentalInfo)
          .subscribe((resp) => {
            this.toastrService.info(resp.message, "The Car Rented!");
          }, respError => {
            console.log(respError)
          })

        }, responseError => {
          this.toastrService.error("Sorry, please check your card details!")
        })


    }
    else{
      this.toastrService.error("Sorry , there is empty places, please check again.")
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

  
