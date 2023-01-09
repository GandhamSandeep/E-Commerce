import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/data-type';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchResult: undefined | Product[];

  constructor(private activateRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    let query = this.activateRoute.snapshot.paramMap.get('query')
    console.log(query)
    query && this.productService.searchProducts(query).subscribe((result)=>{
      console.log(result)
      this.searchResult = result;
    })
  }

}
