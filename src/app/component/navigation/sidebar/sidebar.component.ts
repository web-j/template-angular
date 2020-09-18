import { animate, style, transition, trigger } from '@angular/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthenticationService } from 'src/app/security/helpers/authentication.service';
import { ThemeService } from '../../theme/theme.service';
import { RouterInfo } from './interface/router-info.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('0.3s ease-out',
              style({ height: 50, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 50, opacity: 1 }),
            animate('0.3s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class SidebarComponent implements OnInit {

  router: RouterInfo[] = [
    {
      path: '',
      icon: 'dashboard',
      title: 'Dashboard',
      type: 'link',
      role: ['']
    },

    {
      path: '',
      icon: 'settings',
      title: 'Cadastros Gerais',
      type: 'sub',
      role: ['ADMIN'],
      open: false,
      submenu: [
        {
          path: '/user',
          title: 'Usuários'
        }
      ]
    },
  ];

  public accessRole: any;
  public currentUser: any;
  public isDarkTheme: Observable<boolean>;

  constructor(
    private authenticationService: AuthenticationService,
    private themeService: ThemeService
    ) { }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.accessRole = this.currentUser.user.accessRole;

    this.isDarkTheme = this.themeService.isDarkTheme;
  }

}
