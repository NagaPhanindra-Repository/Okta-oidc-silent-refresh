import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { AppComponent } from './app.component';
import { UserIdleComponent } from './user-idle/user-idle.component';
const routes: Routes = [
  {
    path: 'user-activity',
    component: UserIdleComponent
  },
  { path: 'callback', component: AppComponent }
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
