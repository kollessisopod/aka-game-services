import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  errMessage:string="";

  constructor(private authService:AuthService){}

  onSubmit(e:NgForm){
    let loginDTO = e.form.value;
    var result = this.authService.login(loginDTO.username, loginDTO.password);
    if(result.isSuccess)
      localStorage.setItem("token", result.Data)
    else 
      this.errMessage=result.Message;
    
  }

}
