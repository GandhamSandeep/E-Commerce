import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login, SignUp } from '../models/data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  inValidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private route: Router) { }

  userSignUp(user: SignUp) {
    this.http.post("http://localhost:3000/users", user, { observe: 'response' }).subscribe((result) => {
      console.log(result)
      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body))
        this.route.navigate(['/']);
      }
    });
  }

  userLogin(data: Login) {
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result) => {
      if (result && result.body?.length) {
        this.inValidUserAuth.emit(false);
        localStorage.setItem('user', JSON.stringify(result.body[0]))
        this.route.navigate(['/']);
      }else{
        this.inValidUserAuth.emit(true);
      }
    });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.route.navigate(['/'])
    }
  }
}
