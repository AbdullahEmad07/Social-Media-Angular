import { Component, inject, Input } from '@angular/core';
import { IPost } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',

})
export class PostComponent {
  private post_service = inject(PostService);
  private userService = inject(UsersService);

  router = inject(Router);
  @Input() post: IPost = {
    id: '',
    postBody: "",
    postImg: "",
    liked: false,
    post_date: new Date(),
    userId: ''
  }
  comment = "";
  postLike() {
    this.post.liked = !this.post.liked;
  }
  deletePost() {
    if (this.userService.loggedUser) {
      if (this.post.userId == this.userService.loggedUser.id) {
        this.post_service.deleteById(this.post.id);
      }
      else {
        alert("You can not delete this post");
      }
    }
  }
  editPost(postId: string) {
    if (this.userService.loggedUser) {
      if (this.post.userId == this.userService.loggedUser.id) {
        this.router.navigate(['editPost', postId]);
      }
      else {
        alert("You can not edit this post");
      }
    }

  }
  hidePost() {
    this.post_service.hidePost(this.post.id);
  }
}
