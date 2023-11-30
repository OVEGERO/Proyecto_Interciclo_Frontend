import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { FiltersRoutingModule } from './filters-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PrimengModule } from '../primeng/primeng.module';
import { RsaComponent } from './pages/rsa/rsa.component';
import { AesComponent } from './pages/aes/aes.component';
import { SharedModule } from '../shared/shared.module';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { BtnEncryptComponent } from './components/btn-encrypt/btn-encrypt.component';
import { ViewPassComponent } from './components/view-pass/view-pass.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    RsaComponent,
    AesComponent,
    TextAreaComponent,
    FileUploadComponent,
    BtnEncryptComponent,
    ViewPassComponent
  ],
  imports: [
    CommonModule,
    FiltersRoutingModule,
    PrimengModule,
    SharedModule,
    FormsModule
  ]
})
export class FiltersModule { }
