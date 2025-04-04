import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const usersService=inject(UsersService);
  if(usersService.loggedUser){
    return true;
  }
  else{
    const router=inject(Router);
    router.navigate(['login'])
    return false;
  }
};
