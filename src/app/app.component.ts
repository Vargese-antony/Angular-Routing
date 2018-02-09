import { Component, OnInit } from '@angular/core';
import { 
    Router, 
    Event, 
    NavigationStart, 
    NavigationEnd, 
    NavigationCancel, 
    NavigationError 
} from '@angular/router';

import { AuthService } from './user/auth.service';

@Component({
    selector: 'pm-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
    pageTitle: string = 'Acme Product Management';
    loading: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() : void {
        this.router.events.subscribe( (routerEvent: Event) => {
            this.setLoadingProperty(routerEvent);
        });
    }
    
    setLoadingProperty(routerEvent:Event) {
        if(routerEvent instanceof NavigationStart) {
            this.loading = true;
        } else if( routerEvent instanceof NavigationCancel || 
            routerEvent instanceof NavigationError || 
            routerEvent instanceof NavigationEnd) 
        {
            this.loading = false;
        }
    }

    logOut(): void {
        this.authService.logout();
        console.log('Log out');
        // Navigate to the welcome page
        this.router.navigateByUrl('/welcome');
    }
}
