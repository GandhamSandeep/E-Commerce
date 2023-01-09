import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { order } from 'src/app/models/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  orderData: order[] | undefined;

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId: number | undefined){
    orderId && this.productService.cancelOrder(orderId).subscribe((result)=>{
      this.productService.orderList().subscribe((result)=>{
        this.orderData = result
      }) 
    })
  }

  getOrderList(){
    this.productService.orderList().subscribe((result)=>{
      this.orderData = result;
    })
    // if(!this.orderData?.length){
    //   this.router.navigate(['/'])
    // }
  }

}
