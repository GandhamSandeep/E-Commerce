import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/data-type';
import { ProductService } from 'src/app/services/product.service';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {

  productList: undefined | Product[];
  productMessage: undefined | string

  icon = faTrash;
  editIcon = faEdit;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.list();
  }
  deleteProduct(id: number) {
    console.log("test id", id)

    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = "product is deleted"
        this.list();
      }
    })

    setTimeout(() => {
      this.productMessage = undefined
    }, 3000);
  }

  list() {
    this.productService.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    })
  }

}
