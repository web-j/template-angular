import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { AuthenticationService } from 'src/app/security/helpers/authentication.service';
import { ThemeService } from '../../theme/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isDarkTheme: Observable<boolean>;

  @Output() toggleSidenav = new EventEmitter<void>();

  public isAlternateMode = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleDarkTheme(checked: boolean): void {
    this.themeService.setDarkTheme(checked);
  }

  logOut(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
