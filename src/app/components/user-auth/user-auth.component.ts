import { Component, OnInit } from '@angular/core';
import { parse } from '@fortawesome/fontawesome-svg-core';
import { Cart, Login, Product, SignUp } from 'src/app/models/data-type';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {

  showLogin: boolean = true;
  authError: string = "";

  constructor(private userService: UserService, private productService: ProductService) { }

  ngOnInit(): void {
    this.userService.userAuthReload()
  }

  singUp(data: SignUp) {
    console.log(data)
    this.userService.userSignUp(data)
  }

  login(data: Login) {
    this.userService.userLogin(data);
    this.userService.inValidUserAuth.subscribe((result) => {
      console.log('apple', result)
      if (result) {
        this.authError = "Please enter valid user details"
      } else {
        this.localCartToRemoveCart()
      }
    });
  }

  openSignUp() {
    this.showLogin = false;
  }

  openLogin() {
    this.showLogin = true;
  }

  localCartToRemoveCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;

    if (data) {
      let cartDataList: Product[] = JSON.parse(data)
      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId
        };

        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log('item stored in DB');
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart')
          }
        }, 2000);
      });
    }
    setTimeout(() => {
      this.productService.getCartList(userId);
    }, 2000);
  }
}
