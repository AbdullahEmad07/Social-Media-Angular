import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  usersService=inject(UsersService);

  get currentUser(){
    return this.usersService.loggedUser;
  }
  logOut(){
    this.usersService.logOut();
  }
  onClickHidden(){
    
    
    
  }
}
