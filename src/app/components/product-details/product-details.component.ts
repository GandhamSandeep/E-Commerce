import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from 'src/app/models/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productData: undefined | Product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: Product | undefined;

  constructor(private activatRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    let productId = this.activatRoute.snapshot.paramMap.get("productId")
    console.log(productId)
    productId && this.productService.getProduct(productId).subscribe((result) => {
      console.log(result)
      this.productData = result;
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: Product) => productId === item.id.toString())
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.productService.getCartList(userId);

        this.productService.cartData.subscribe((result) => {
          let item = result.filter((item: Product) => {
            productId?.toString() === item.productId?.toString()
          })

          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
      }
    })
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1
    } else if (this.productQuantity > 0 && val === 'min') {
      this.productQuantity -= 1
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;

      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData)
        this.removeCart = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: Cart = {
          ...this.productData,
          productId: this.productData.id,
          userId
        }
        delete cartData.id;
        this.productService.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.productService.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }

  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFromCart(productId);
      
    } else {
      console.log('cartData',this.cartData)
      this.cartData && this.productService.removeToCart(this.cartData.id).subscribe((result)=>{
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        this.productService.getCartList(userId);
      })
    }
    this.removeCart = false;
  }
}