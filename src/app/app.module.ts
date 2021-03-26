import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Added below imports 
import { HttpClientModule } from '@angular/common/http';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LogoutComponent } from './logout/logout.component';
import { ValidationHandler, OAuthStorage, OAuthModuleConfig } from 'angular-oauth2-oidc'; // Added


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
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
