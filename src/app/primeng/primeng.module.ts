import { NgModule } from '@angular/core';

import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@NgModule({
  declarations: [],
  exports: [
    DropdownModule,
    InputNumberModule,
    FileUploadModule,
    TooltipModule,
    ButtonModule,
    ToastModule,
    InputTextareaModule,
    PasswordModule,
    TabViewModule,
    ScrollPanelModule
  ]
})
export class PrimengModule { }
