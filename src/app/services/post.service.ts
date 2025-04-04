import { inject, Injectable } from '@angular/core';
import { IPost } from '../models/post.model';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  userService = inject(UsersService);
  http = inject(HttpClient);
  router = inject(Router);
  postArr: IPost[] = [];
  getPosts() {
    this.http.get<IPost[]>('http://localhost:3000/posts').subscribe({
      next: (posts) => {
        this.postArr = posts;
      }
    })
  }
  addNewPost(_postBody: string, _postImg: string, _userId: string) {
    const newPost = {
      id: (Math.random() * new Date().getTime()).toFixed().toString(),
      postBody: _postBody,
      postImg: _postImg,
      liked: false,
      post_date: new Date(),
      userId: _userId
    }
    this.postArr.push(newPost);
    this.userService.users.forEach((user) => user.userPosts.push(newPost));
    this.http.post('http://localhost:3000/posts', newPost).subscribe({
      complete: () => {

      },
      error: () => {
        this.postArr = this.postArr.filter((e) => e.id !== newPost.id);
      }
    })

    this.userService.users.forEach(user =>
      this.http.put(`http://localhost:3000/users/${user.id}`, user).subscribe({
        complete: () => {

        },
        error: () => {
          user.userPosts = user.userPosts.filter(p => p.id != newPost.id);
        }
      })
    )


  }
  editPost(postBody: string, postImage: string, postId: string) {
    const postIndx = this.postArr.findIndex((e) => e.id === postId);
    if (postIndx != -1) {
      const oldPost = { ...this.postArr[postIndx] };
      const newPost = {
        ...this.postArr[postIndx],
        postBody,
        postImage
      }
      this.postArr[postIndx] = newPost;
      this.http.patch('http://localhost:3000/posts/' + postId, newPost).subscribe({
        complete: () => {

        },
        error: () => {
          this.postArr[postIndx] = oldPost;
        }
      });

      if(this.userService.loggedUser){
        const userIndex = this.userService.users.findIndex(e => e.id == this.userService.loggedUser?.id);
        const oldUserPosts = this.userService.users[userIndex].userPosts;
        const oldHiddenPosts = this.userService.users[userIndex].hiddenPosts;
        this.userService.users[userIndex].userPosts=this.userService.users[userIndex].userPosts
        .map(e=>e.id==postId?newPost:e);
        this.userService.users[userIndex].hiddenPosts=this.userService.users[userIndex].hiddenPosts
        .map(e=>e.id==postId?newPost:e);
        this.http.put(`http://localhost:3000/users/${this.userService.loggedUser.id}`,this.userService.users[userIndex]).subscribe({
          error:()=>{
            this.userService.users[userIndex].userPosts=oldUserPosts;
            this.userService.users[userIndex].hiddenPosts=oldHiddenPosts;
          }
        })
      }
    }
    
  }
  deleteById(id: string) {
    const oldPosts = [...this.postArr];
    const postIndx = this.postArr.findIndex((e) => e.id === id);
    this.postArr.splice(postIndx, 1);
    this.http.delete('http://localhost:3000/posts/' + id).subscribe({
      error: () => {
        this.postArr = oldPosts;
      }
    });
    if (this.userService.loggedUser) {
      const userIndex = this.userService.users.findIndex(e => e.id == this.userService.loggedUser?.id);
      const oldUserPosts = this.userService.users[userIndex].userPosts;
      const oldHiddenPosts = this.userService.users[userIndex].hiddenPosts;
      this.userService.users[userIndex].userPosts = this.userService.users[userIndex].userPosts
        .filter(e => e.id != id);
      this.userService.users[userIndex].hiddenPosts = this.userService.users[userIndex].hiddenPosts
        .filter(e => e.id != id);
      this.http.put(`http://localhost:3000/users/${this.userService.loggedUser.id}`,this.userService.users[userIndex]).subscribe({
        error:()=>{
          this.userService.users[userIndex].userPosts = oldUserPosts;
          this.userService.users[userIndex].hiddenPosts = oldHiddenPosts;
        }
      })
    }

  }
  hidePost(postId: string) {
    if (this.userService.loggedUser?.userPosts.find(e => e.id == postId)) {

      const postIndex = this.postArr.findIndex(e => e.id == postId);
      const userIndex = this.userService.users.findIndex(e => e.id == this.userService.loggedUser?.id);
      this.userService.users[userIndex].hiddenPosts.push(this.postArr[postIndex]);
      this.userService.users[userIndex].userPosts = this.userService.users[userIndex].userPosts
        .filter(e => e.id != postId);
      this.http.put(`http://localhost:3000/users/${this.userService.loggedUser.id}`, this.userService.users[userIndex]).subscribe({
        error: () => {
          this.userService.users[userIndex].hiddenPosts = this.userService.users[userIndex].hiddenPosts
            .filter(e => e.id != postId);
          this.userService.users[userIndex].userPosts.push(this.postArr[postIndex]);
        }
      })

    }
  }

  unhideAllPosts() {
    if (this.userService.loggedUser) {
      const userIndex = this.userService.users.findIndex(e => e.id == this.userService.loggedUser?.id);
      const oldHiddenPosts = this.userService.users[userIndex].hiddenPosts;
      const oldUserPosts = this.userService.users[userIndex].userPosts;
      this.userService.users[userIndex].hiddenPosts.forEach(post => {
        this.userService.users[userIndex].userPosts.push(post);
      })
      this.userService.users[userIndex].hiddenPosts = [];
      this.http.put(`http://localhost:3000/users/${this.userService.loggedUser.id}`, this.userService.users[userIndex]).subscribe({
        error: () => {
          this.userService.users[userIndex].hiddenPosts = oldHiddenPosts;
          this.userService.users[userIndex].userPosts = oldUserPosts;
        }
      })
    }

  }
}
