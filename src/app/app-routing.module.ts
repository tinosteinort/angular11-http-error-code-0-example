import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RestrictedComponent} from './restricted/restricted.component';
import {RestrictedGuard} from './restricted.guard';
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: 'restricted',
    component: RestrictedComponent,
    canActivate: [RestrictedGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
