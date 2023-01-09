import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit {

  addProductMessage: string | undefined;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  }

  submit(data: Product){
    this.productService.addProduct(data).subscribe((result)=>{
      console.log(result,'>>>>',data)
      if(result){
        this.addProductMessage =  "product is successfully added"
      }
      setTimeout(() => {
        this.addProductMessage = undefined;
      }, 3000);
    });
  }
}
