import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DecryptRequest, DecryptResponse, EncryptRequest, EncryptResponse } from '../../interfaces';
import { CriptographyService } from '../../services/cryptography.service';
import { MessageService } from 'primeng/api';
import { InputNumberInputEvent } from '../../interfaces';
import { LocalStorageService } from '../../services/local-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-btn-encrypt',
  templateUrl: './btn-encrypt.component.html',
  styles: [],
  providers: [MessageService],
})
export class BtnEncryptComponent implements OnInit {

  @Input({
    required: true,
  })
  public text: string = '';

  public encryption_type: 'aes' | 'rsa' = 'aes';

  @Output()
  public onResultText = new EventEmitter<string>();

  @Output()
  public onClearKeys = new EventEmitter<boolean>();

  public modes: any[] = [];
  public selectedMode: any;
  public options: any[] = [];
  public selectedOption: any;

  @Input()
  public key_size: number = 1;

  public disabled: boolean = true;

  @Input()
  public public_key: string = '';

  @Input()
  public iv: string = '';

  @Input()
  public private_key: string = '';

  public loading: boolean = false;

  constructor(
    private crypService: CriptographyService,
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute
  ){
    this.getLocation();
  }

  ngOnInit(): void {
    this.modes = [{ name: 'CPU' }, { name: 'GPU' }];
    this.options = [{ name: 'Encriptar' }, { name: 'Desencriptar' }];
  }

  getLocation(){
    this.activatedRoute.url.subscribe(url => {
      this.encryption_type = url[0].path as 'aes' | 'rsa';
    });
  }

  onBlur() {
    if (this.key_size < 1) {
      this.key_size = 1;
    }
  }

  onModeChange() {
    if (this.selectedMode == '' || this.selectedOption == '' || this.text == '') {
      return true;
    }else{
      return false;
    }
  }

  setLocalStorage(data: EncryptResponse){
    this.localStorageService.setLocalStorage(data, this.encryption_type, this.key_size);
  }

  onClear(type: string | undefined) {
    if (type == 'modo') {
      this.selectedMode = '';
    }else if (type == 'operacion') {
      this.selectedOption = '';
    }
  }

  encrypt(encrypRequest: EncryptRequest){
    this.loading = true;
    this.crypService.encrypt(encrypRequest).subscribe({
      next: (response: EncryptResponse) => {
        if (response.public_key != '0') {
          this.setLocalStorage(response);
        }
        this.onEmitResultText(response.encrypted_text);
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Texto encriptado',
        });
        this.loading = false;
      },
      error: (e) => console.log(e)
    });
  }

  decrypt(decryptedRequest: DecryptRequest){
    this.loading = true;
    this.crypService.decrypt(decryptedRequest).subscribe({
      next: (response: DecryptResponse) => {
        this.onEmitResultText(response.decrypted_text);
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Exito',
          detail: 'Texto desencriptado',
        });
        this.loading = false;
      },
      error: (e) => console.log(e)
    });
  }

  onClick() {
    if (this.selectedOption.name == 'Desencriptar') {
      this.decrypt({
        text: this.text,
        mode: this.selectedMode.name.toLowerCase(),
        encrypt_type: this.encryption_type,
        private_key: this.private_key,
        public_key: this.public_key!,
        iv: this.iv,
      });
    }else{
      this.encrypt({
        text: this.text,
        mode: this.selectedMode.name.toLowerCase(),
        encrypt_type: this.encryption_type,
        key_size: this.key_size,
        public_key: this.public_key,
        iv: this.iv,
      });
    }
  }

  onClickDisabled(){
    this.public_key = '';
    this.private_key = '';
    this.iv = '';
    this.messageService.add({
      severity: 'info',
      summary: 'Retirado',
      detail: 'Claves retiradas',
    });
    this.onClearKeys.emit(true);
  }

  onEmitResultText(text: string) {
    this.onResultText.emit(text);
  }

}
