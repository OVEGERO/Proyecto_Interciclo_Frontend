import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadEvent } from '../../interfaces/file-upload-event.interface';

@Component({
  selector: 'app-file-upload',
  template: `
    <div class="card flex justify-content-center mt-5">
      <p-toast></p-toast>
      <p-fileUpload
        chooseLabel="Seleccionar .txt"
        mode="basic"
        name="demo[]"
        url="https://www.primefaces.org/cdn/api/upload.php"
        accept="text/plain"
        class="animate__animated animate__fadeIn"
        [maxFileSize]="10000000"
        (onUpload)="onUpload($event)"
        (onBeforeUpload)="onProgress($event)"
        [disabled]="loading"
        [auto]="true"
      >
      </p-fileUpload>
    </div>
  `,
  styles: [],
  providers: [MessageService],
})
export class FileUploadComponent {
  @Output()
  public onFileReader = new EventEmitter<string>();

  public text = '';

  public loading: boolean = false;

  constructor(private messageService: MessageService) {}

  onUpload(event: FileUploadEvent) {
    this.loading = true;
    const file = event.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const text = fileReader.result as string;
      this.text = text;
      this.onFileReaderChange();
    };
    fileReader.readAsText(file);
    this.messageService.add({
      severity: 'info',
      summary: 'Texto Cargado',
      detail: '',
    });
    this.loading = false;
  }

  onProgress(e: any) {
    this.loading = true;
  }

  onFileReaderChange() {
    this.onFileReader.emit(this.text);
  }
}
