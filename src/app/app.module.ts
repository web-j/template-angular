import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AdminLayoutComponent } from './component/layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './component/layout/auth-layout/auth-layout.component';
import { NotfoundLayoutComponent } from './component/layout/notfound-layout/notfound-layout.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { JwtInterceptor } from './security/helpers/jwt.interceptor';
import { ErrorInterceptor } from './security/helpers/error.interceptor';
import { NavigationModule } from './component/navigation/navigation.module';
import { AbstractDialogComponent } from './abstract/abstract-dialog/abstract-dialog.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,

    AdminLayoutComponent,
    AuthLayoutComponent,
    NotfoundLayoutComponent,
    SpinnerComponent,
    AbstractDialogComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PerfectScrollbarModule,
    MaterialModule,
    NavigationModule
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],

  entryComponents: [
    AbstractDialogComponent
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
