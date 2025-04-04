import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IUser, UsersService } from '../../services/users.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  usersService = inject(UsersService);
  postService=inject(PostService);
  registerForm = new FormGroup({
    userName: new FormControl('', []),
    password: new FormControl('', []),
    userImage: new FormControl('', [])
  })

  onRegister() {
    const len=this.usersService.users.length;
    const id=len?this.usersService.users[len-1].id:0;
    if(this.registerForm.controls.userName.value&&this.registerForm.controls.password.value&&this.registerForm.controls.userImage.value){
      const newUser:IUser={
        id:(Math.random()*new Date().getTime()).toFixed().toString(),
        userName:this.registerForm.controls.userName.value,
        password:this.registerForm.controls.password.value,
        userImage:this.registerForm.controls.userImage.value,
        userPosts:this.postService.postArr,
        hiddenPosts:[]
      }
      this.usersService.register(newUser);
    }
  }
}
