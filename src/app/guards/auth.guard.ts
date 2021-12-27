import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  
  constructor(private auth: AuthService, private route: Router){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    //console.log('Guard');
    if (this.auth.estaAutenticado()) {
      return true;
    }else{
      this.route.navigateByUrl('/login');
    }
  }
}
