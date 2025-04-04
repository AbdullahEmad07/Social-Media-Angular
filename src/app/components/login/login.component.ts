import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usersService=inject(UsersService);
  loginForm=new FormGroup({
      userName:new FormControl('',[]),
      password:new FormControl('',[])
    })

    onLogin(){
      const controller=this.loginForm.controls;
      if(controller.userName.value&&controller.password.value){
        this.usersService.login(controller.userName.value,controller.password.value)
      }
      
    }
}
