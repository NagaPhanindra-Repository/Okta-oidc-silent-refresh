import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Added below imports 
import { HttpClientModule } from '@angular/common/http';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LogoutComponent } from './logout/logout.component';
import { ValidationHandler, OAuthStorage, OAuthModuleConfig } from 'angular-oauth2-oidc';
import { UserIdleComponent } from './user-idle/user-idle.component'; // Added
//Adde for user idle or user activity


import { FormsModule, ReactiveFormsModule } from '@angular/forms';


export const authModuleConfig: OAuthModuleConfig = {
  // Inject "Authorization: Bearer ..." header for these APIs:
  resourceServer: {
    allowedUrls: ['http://localhost:4200'],
    sendAccessToken: true,
  }

}


export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    UserIdleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(authModuleConfig)
  ],
  providers: [
  
    { provide: ValidationHandler, useClass: JwksValidationHandler },
    
       
        { provide: OAuthModuleConfig, useValue: authModuleConfig },
        { provide: OAuthStorage, useFactory: storageFactory }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {



}
