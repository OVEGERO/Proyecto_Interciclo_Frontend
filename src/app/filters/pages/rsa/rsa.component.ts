import { Component } from '@angular/core';
import { Keys } from '../../interfaces';

@Component({
  selector: 'app-rsa',
  templateUrl: './rsa.component.html',
  styles: [``],
})
export class RsaComponent {

  public text: string = '';

  public keys: Keys = {
    key_size: 1,
    public_key: '',
    private_key: '',
    iv: '',
  };

  readFile(text: string){
    this.text = text;
  }

  setText(text: string){
    this.text = text;
  }

  setResultText(text: string){
    this.text = text;
  }

  setKeys(keys: Keys){
    this.keys = keys;
  }

  clearKeys(clear: boolean){
    if (clear){
      this.keys = {
        key_size: 1,
        public_key: '',
        private_key: '',
        iv: '',
      };
    }
  }

}
