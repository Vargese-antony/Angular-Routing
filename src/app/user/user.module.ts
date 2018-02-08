import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';

import { SharedModule } from '../shared/shared.module';

const routes : Route[] = [
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class UserModule { }
