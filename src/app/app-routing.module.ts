import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      {
        path: 'home',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren: () => import('./pages/dashboards/credit-card/credit-card.module').then(m => m.CreditCardModule),
      },
      {
        path: 'credit-card1',
        loadChildren: () => import('./pages/dashboards/credit-card/credit-card.module').then(m => m.CreditCardModule),
      },
      {
        path: 'credit-card2',
        loadChildren: () => import('./pages/dashboards/credit-card/credit-card.module').then(m => m.CreditCardModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
