export interface Card{
    id: number;
    customerId:number;
    CardHolderName:string;
    cardNumber:string;
    cardExpirationDate:string;
    cardCvv:number;
}   
export class WalletTotal{
    customerId:number;
    walletTotal:number;

}