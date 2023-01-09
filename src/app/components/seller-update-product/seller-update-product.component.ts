import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {

  productData: undefined | Product;
  productMessage : undefined | string;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')
    console.log(productId)
    productId && this.productService.getProduct(productId).subscribe((data: any) => {
      console.log(data)
      this.productData = data
    })
  }

  submit(data: Product) {
    console.log(data)
    if(this.productData) {
      data.id = this.productData.id
    }
    this.productService.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productMessage = "product updated Successfully"
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

}
