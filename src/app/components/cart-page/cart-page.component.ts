import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, pricedetails } from 'src/app/models/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  cartData: Cart[] | undefined;
  pricedetails: pricedetails = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(private productService: ProductService, private router:Router) { }

  ngOnInit(): void {
    this.loadDetails();
  }

  removeCart(cartId: number | undefined){
    cartId && this.cartData && this.productService.removeToCart(cartId).subscribe((result)=>{
      this.loadDetails();
    })
  }

  loadDetails(){
    this.productService.currentCart().subscribe((result) => {
      this.cartData = result;
      console.log('>>>', this.cartData, 'cartData');
      let price = 0;
      result.forEach((item) => {
        if(item.quantity){
          price = price + (+item.price* +item.quantity);
        }
      });
      this.pricedetails.price = price;
      this.pricedetails.discount = price / 10;
      this.pricedetails.tax = price / 10;
      this.pricedetails.delivery = 100;
      this.pricedetails.total = price + (price / 10) + 100 - (price / 10);
      console.log(this.pricedetails,'>>>','');

      if(!this.cartData.length){
        this.router.navigate(['/'])
      }
    });
  }

  checkout(){
    this.router.navigate(['/checkout'])
  }
}
