import { Component, inject } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private post_service=inject(PostService);
  private userService=inject(UsersService);
  get posts(){
    if(this.userService.loggedUser){
      return this.userService.loggedUser.userPosts;
    }
    else
    {
      return this.post_service.postArr;
    }
    
    
  }
  
  
}
