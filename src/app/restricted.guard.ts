import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestrictedGuard implements CanActivate {

  constructor() {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const forWhateverReason = true;
    if (forWhateverReason) {
      window.location.assign(encodeURI('https://www.google.de'));
      return false;
    }
    return true;
  }
}
