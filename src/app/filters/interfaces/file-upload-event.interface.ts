import { HttpEvent } from "@angular/common/http";

export interface FileUploadEvent {
  originalEvent: HttpEvent<any>;
  files: File[];
}
