import { NgModule } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ButtonModule } from 'primeng/button';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    ButtonModule,
    RouterModule
  ]
})
export class SharedModule { }

