import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/data-type';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  [x: string]: any;

  menuType: string = 'default';
  sellerName: string = "";
  searchResult: undefined | Product[];
  userName: string = "";
  cartItems = 0;

  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.log('in seller area')
          // Displaying user name in header
            let sellerStore = localStorage.getItem('seller')
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            this.menuType = 'seller';
          //user login part
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.productService.getCartList(userData.id)
        }
        else {
          console.log('outside seller area')
          this.menuType = 'default';
        }
      }
    })
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length
    }
    this.productService.cartData.subscribe((items)=>{
      this.cartItems = items.length;
    })
  }

  logout() {
    localStorage.removeItem('seller')
    this.router.navigate(['/']);
  }

  userLogOut(){
    localStorage.removeItem('user')
    this.router.navigate(['/user-auth']);
    this.productService.cartData.emit([]);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.log(element.value)
      this.productService.searchProducts(element.value).subscribe((result) => {
        console.log(result)
        if (result.length > 5) {
          result.length = 5
        }
        this.searchResult = result;
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  redirectToDetails(id: number) {
    this.router.navigate(['/details/' + id]);
  }

  submitSearch(val: string) {
    console.log(val)
    this.router.navigate([`search/${val}`])
  }
}
