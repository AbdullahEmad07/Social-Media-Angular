import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PostComponent } from './components/post/post.component';
import { UserDataComponent } from './components/post/user-data/user-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoComponent } from './components/demo/demo.component';
import { ParentComponent } from './components/demo/parent/parent.component';
import { ChildComponent } from './components/demo/parent/child/child.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { notAuthGuard } from './guards/not-auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HiddenComponent } from './components/hidden/hidden.component';

const routes:Routes=[
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'hidden',
    canActivate:[authGuard],
    component:HiddenComponent
  },
  {
    path:'login',
    canActivate:[notAuthGuard],
    component:LoginComponent
  },
  {
    path:'register',
    canActivate:[notAuthGuard],
    component:RegisterComponent
  },
  {
    path:'createPost',
    canActivate:[authGuard],
    component:PostFormComponent
  },
  {
    path:'editPost/:postId',
    canActivate:[authGuard],
    component:PostFormComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    PostComponent,
    UserDataComponent,
    DemoComponent,
    ParentComponent,
    ChildComponent,
    PostFormComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
