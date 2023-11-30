import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'cryptography',
    loadChildren: () => import('./filters/filters.module').then(m => m.FiltersModule)
  },
  {
    path: '**',
    redirectTo: 'cryptography'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {}
