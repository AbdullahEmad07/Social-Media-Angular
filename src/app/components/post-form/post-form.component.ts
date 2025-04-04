import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent implements OnInit {
  private post_service=inject(PostService);
  private usersService=inject(UsersService);
  activatedRoute=inject(ActivatedRoute);
  router=inject(Router);
  postId:string|null=null;
  addPostForm=new FormGroup({
    postBody:new FormControl('',[]),
    postImg:new FormControl('',[])
  })
  ngOnInit(): void {
   this.activatedRoute.params.subscribe({
    next:(params)=>{
      this.postId=params?.['postId'];
      if(this.postId){
        const post=this.post_service.postArr.find((post)=>post.id===this.postId)
        if(post){
          this.addPostForm.controls.postBody.setValue(post.postBody);
          this.addPostForm.controls.postImg.setValue(post.postImg);
        }
      }
    }
   })
  }
  
  onSubmit(){
    if(this.postId){
      if(this.usersService.loggedUser&&this.addPostForm.controls.postBody.value&&this.addPostForm.controls.postImg.value){
        this.post_service.editPost(this.addPostForm.controls.postBody.value,this.addPostForm.controls.postImg.value,this.postId);
        this.router.navigate(['']);
      }
    }
    else if(this.usersService.loggedUser&&this.addPostForm.controls.postBody.value&&this.addPostForm.controls.postImg.value){
      this.post_service.addNewPost(this.addPostForm.controls.postBody.value,this.addPostForm.controls.postImg.value,
        this.usersService.loggedUser.id);
        this.router.navigate(['']);
    }
    
  }
  
}
