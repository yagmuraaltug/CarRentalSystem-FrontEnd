import { Component, OnInit } from '@angular/core';
import { Wallet } from 'src/app/models/wallet';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  
  wallets : Wallet[];
  totalPrice: number;
  constructor(private walletService: WalletService) { }

  ngOnInit(): void {

      this.getWallets();
    }
  
  getWallets(){
      this.wallets = this.walletService.walletList();
  
      this.walletService.data
        .subscribe((response) => {
          this.totalPrice = response.walletTotal;
        })
    }
  }

