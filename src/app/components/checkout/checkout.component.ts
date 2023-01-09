import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, order } from 'src/app/models/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number | undefined;
  cartData: Cart[] | undefined;
  orderMessage: string | undefined;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result
      result.forEach((item) => {
        if(item.quantity){
          price = price + (+item.price* +item.quantity);
        }
      });
      this.totalPrice = price+(price/10)+100-(price/10); 
      console.log(this.totalPrice,'>>>>')
    });
  }

  orderNow(data: order){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    
    if(this.totalPrice){
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }


      this.cartData?.forEach((item)=>{
        setTimeout(() => {
          item.id && this.productService.deleteCartItems(item.id)
        }, 700);
      })


      this.productService.orderNow(orderData).subscribe((result)=>{
        if(result){
          console.log(result)
          this.orderMessage = "your order has been palced successfully"
          // alert(this.orderMessage)
          setTimeout(() => {
            this.router.navigate(['/my-orders'])
            this.orderMessage = undefined;
          }, 2000);
        }
      })
    }
  }
}
