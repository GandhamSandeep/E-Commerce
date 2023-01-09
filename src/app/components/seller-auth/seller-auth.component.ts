import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/models/data-type';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {

  showLogin = false;
  authError  = '';

  constructor(private sellerService:SellerService, private router:Router) { }

  ngOnInit(): void{
    this.sellerService.reloadSeller()
  }

  signUp(data: SignUp): void{
    console.log(data)
    this.sellerService.userSignUp(data);
  }

  login(data: SignUp): void{
    console.log(data)
    this.authError = "";
    this.sellerService.userLogin(data)
    this.sellerService.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError = "Email or Password is not correct"
      }
    })
  }

  openLogin(){
    this.showLogin = true;
  }

  openSignUp(){
    this.showLogin = false;
  }
}
