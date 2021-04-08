import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WalletTotal } from '../models/card';
import { Basket, Wallet } from '../models/wallet';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  
  private walletTotal = new WalletTotal();
  private dataSource = new BehaviorSubject<WalletTotal>(this.walletTotal);
  data = this.dataSource.asObservable();


  constructor() { }

  addToCart(wallet:Wallet){
    Basket.push(wallet);
    this.walletTotal.customerId = wallet.customerId;
    this.calculateCart();
  }


  calculateCart(){
    let total = Basket.reduce((acc, val) => acc += val.totalPrice, 0)
    this.walletTotal.walletTotal = total;
    this.dataSource.next(this.walletTotal);
  }

  walletList():Wallet[]{
    return Basket
  }
}
