import { Component, inject } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-hidden',
  templateUrl: './hidden.component.html',
  styleUrl: './hidden.component.css'
})
export class HiddenComponent {
  private postService=inject(PostService);
  private userService = inject(UsersService);
  get posts() {
    if (this.userService.loggedUser) {
      return this.userService.loggedUser.hiddenPosts;
    }
    return
  }
  onClickUnhide(){
    this.postService.unhideAllPosts();
  }
}
