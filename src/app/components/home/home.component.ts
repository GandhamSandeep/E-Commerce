import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  popularProducts : undefined | Product[];
  trendyProducts : undefined | Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.popularProduct().subscribe((data)=>{
      console.log(data)
      this.popularProducts = data;
    })
    this.productService.trendyProducts().subscribe((data)=>{
      this.trendyProducts = data;
    })
  }
}
