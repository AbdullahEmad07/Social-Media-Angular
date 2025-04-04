import { Component, inject, Input, OnInit } from '@angular/core';
import { IUser, UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.css'
})
export class UserDataComponent implements OnInit{
  @Input() post_date=new Date;
  @Input() userId='';
  user:IUser={
    id:'',
    userName:'',
    userImage:'',
    password:'',
    userPosts:[],
    hiddenPosts:[]
  }
  usersService=inject(UsersService);
  
  ngOnInit(): void {
    const user= this.usersService.users.find(user=>user.id===this.userId);
    if(user){
      this.user=user;
    }
  }
}
