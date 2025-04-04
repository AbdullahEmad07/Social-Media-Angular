import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const usersService=inject(UsersService);
  if(usersService.loggedUser){
    const router=inject(Router);
    router.navigate(['']);
    return false;
  }
  else{
    return true;
  }
};
