import { Component, inject, OnInit } from '@angular/core';
import { IPost } from './models/post.model';
import { PostService } from './services/post.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  userService=inject(UsersService);
  postService=inject(PostService);
  ngOnInit(): void {
    this.userService.getUsers();
    this.postService.getPosts();
  }
  title = 'First_Project';
 
}
