import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-area',
  template: ` <div class="card flex justify-content-center mt-5">
    <p-scrollPanel [style]="{ width: '100%', height: '150px' }">
      <textarea
        rows="5"
        cols="100"
        pInputTextarea
        [(ngModel)]="text"
        (ngModelChange)="onTextChangeFn()"
        placeholder="Texto a cifrar/descifrar"
        class="animate__animated animate__fadeIn"
        [autoResize]="true"
      ></textarea>
    </p-scrollPanel>
  </div>`,
  styles: [],
})
export class TextAreaComponent {
  @Input({
    required: true,
  })
  public text = '';

  @Output()
  public onTextChange = new EventEmitter<string>();

  onTextChangeFn() {
    this.onTextChange.emit(this.text);
  }
}
