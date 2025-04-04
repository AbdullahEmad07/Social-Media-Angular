import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from '../models/post.model';

export interface IUser{
  id:string,
  userName:string,
  userImage:string,
  password:string,
  userPosts:IPost[],
  hiddenPosts:IPost[]
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  http=inject(HttpClient);
  router=inject(Router);

  users:IUser[]=[];
  loggedUser:IUser | null=null;
  successLogin:boolean=true;
  getUsers(){
    this.http.get<IUser[]>('http://localhost:3000/users').subscribe({
      next:(users)=>{
        this.users=users;
      }
    })
  }
  login(userName:string,password:string){
    this.users.forEach(user => {
      if(user.userName===userName && user.password===password){
        this.loggedUser=user;
        this.successLogin=true;
        return;
      }
      
    });
    if(this.loggedUser){
      this.router.navigate(['']);
    }
    else{
      this.successLogin=false;
    }
    
    
  }
  register(newUser:IUser){
    this.users.push(newUser);
    this.http.post('http://localhost:3000/users',newUser).subscribe({
      error:()=>{
        this.users=this.users.filter(e=>e.id!=newUser.id);
      }
    })
    this.router.navigate(['login']);
  }
  logOut(){
    this.loggedUser=null;
  }
}
