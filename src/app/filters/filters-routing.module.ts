import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { AesComponent } from './pages/aes/aes.component';
import { RsaComponent } from './pages/rsa/rsa.component';

const routes: Routes = [
  {
    path: '',
    component : LayoutPageComponent,
    children: [
      { path: 'aes', component: AesComponent },
      { path: 'rsa', component: RsaComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiltersRoutingModule { }
