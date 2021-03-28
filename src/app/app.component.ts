import { Component,OnInit } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { OAuthModule, ValidationHandler,OAuthErrorEvent, OAuthStorage, OAuthModuleConfig } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { UserIdleComponent } from './user-idle/user-idle.component';
import { AfterViewInit, ViewChild } from '@angular/core';

export const authConfig: AuthConfig = {
  issuer: 'https://dev-32616721.okta.com/oauth2/default',
  
  clientId: '0oac6jt6zhLc0BUtB5d6',

 // URL of the SPA to redirect the user to after login
   //redirectUri: window.location.origin
    // + ((localStorage.getItem('useHashLocationStrategy') === 'true')
     // ? '/#/index.html'
     // : '/index.html'),
     responseType: 'id_token token',
  redirectUri: window.location.origin +'/user-activity',
  postLogoutRedirectUri:window.location.origin,
  // URL of the SPA to redirect the user after silent refresh
  silentRefreshRedirectUri:window.location.origin + '/silent-refresh.html',

  useSilentRefresh: true, // Needed for Code Flow to suggest using iframe-based refreshes
  silentRefreshTimeout: 3000, // For faster testing
  timeoutFactor: 0.01, // For faster testing
  sessionChecksEnabled: true,
  
  
  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'naga-okta-oidc-silentrefresh';
  username = '';

   

  constructor(private oauthService: OAuthService,private router: Router) {
    this.oauthService.configure(authConfig);
   this.oauthService.tokenValidationHandler=new JwksValidationHandler();
  this.oauthService.events.subscribe(e => e instanceof OAuthErrorEvent ? console.error(e) : console.warn(e));
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
    
      // Fetch username.
      .then(() => {
        if (oauthService.getIdentityClaims()) {
          this.username = oauthService.getIdentityClaims()['name'];
        }
      });
      oauthService.setupAutomaticSilentRefresh();
      //load user profile
      this.oauthService.events
      .pipe(filter(e => e.type === 'token_received'))
      .subscribe(_ => this.oauthService.loadUserProfile());
  }

  ngOnInit() :void{}


   login() {
   console.log("Logininit")
    this.oauthService.initImplicitFlow();
   
   
  }
  logout() {
    this.oauthService.logOut();
  }

  get getUserName() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    return claims['name'];
  }
  get idToken(): string {
    return this.oauthService.getIdToken();
  }

  get accessToken(): string {
    return this.oauthService.getAccessToken();
  }

  refresh() {
    this.oauthService.refreshToken();
  }
  userActivity(){
    this.router.navigate(['/user-activity']);
  }

}
