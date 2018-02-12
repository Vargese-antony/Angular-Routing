import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuardService } from './user/auth-guard.service';
import { SelectiveStrategyService } from './selective-strategy.service';

const routes: Route[] = [
	{ 
		path: 'products', 
		canActivate:[AuthGuardService], 
		loadChildren:'app/products/product.module#ProductModule',
		data: { preload: true }
	},
	{ path: 'welcome', component: WelcomeComponent},
	{ path: '', redirectTo: 'welcome', pathMatch:'full'},
	{ path: '**', component:PageNotFoundComponent}
  ];
  
@NgModule({
	imports: [RouterModule.forRoot(routes, {preloadingStrategy: SelectiveStrategyService})],
	providers: [SelectiveStrategyService],
	exports: [RouterModule]
})
export class AppRoutingModule {}