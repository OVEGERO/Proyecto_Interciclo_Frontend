import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { EncryptResponse, Keys } from '../../interfaces';
import { MessageService } from 'primeng/api';
import { TabViewCloseEvent } from 'primeng/tabview';
import { LocalStorageService } from '../../services/local-storage.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-pass',
  templateUrl: './view-pass.component.html',
  styles: [``],
  providers: [MessageService],
})
export class ViewPassComponent implements OnInit, OnDestroy {

  @Output()
  public onEncryptData = new EventEmitter<Keys>();

  public encryption_type: 'aes' | 'rsa' | '' = '';

  public label: string = ' ';

  public valueToShow: string = '';

  public data: Map<string, EncryptResponse> = new Map();

  private datosSubscription: Subscription;

  public existData: boolean = false;

  activeIndex: number = 0;

  scrollableTabs: any[] = [];

  constructor(
    private messageService: MessageService,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.getLocation();
    this.datosSubscription = this.localStorageService.getLocalStorage(this.encryption_type).subscribe(datos => {
      this.data = datos;
      if (datos.size > 0) this.existData = true;
      this.initializeScrollableTabs();
    });
  }

  ngOnInit(): void {
    this.initializeScrollableTabs();
    this.setLabel();
  }

  ngOnDestroy() {
    this.datosSubscription.unsubscribe();
  }

  private getLocation() {
    this.activatedRoute.url.subscribe(url => {
      this.encryption_type = url[0].path as 'aes' | 'rsa';
    });
  }

  private initializeScrollableTabs(): void {
    this.scrollableTabs = [...this.data.entries()].map(([key, value]) => ({
      title: key,
      content: value,
    }));
  }

  private setLabel(): void {
    if (this.encryption_type === 'aes') {
      this.label = 'IV';
      this.valueToShow = 'iv';
    } else {
      this.label = 'Clave Privada';
      this.valueToShow = 'private_key';
    }
  }

  deleteFromLocalStorage(key: string){
    this.localStorageService.deleteFromLocalStorage(key, this.encryption_type);
    this.localStorageService.getLocalStorage(this.encryption_type);
    if (this.data.size == 0) {
      this.existData = false
    };
  }

  searchByIndex(index: number): string {
    const entries = Array.from(this.data.entries());
    return entries[index][0];
  }

  onClose(event: TabViewCloseEvent){
    this.messageService.add({
      severity: 'info',
      summary: 'Eliminado',
      detail: 'Se han eliminado las claves',
    });
    const key = this.searchByIndex(event.index);
    this.deleteFromLocalStorage(key);
    this.initializeScrollableTabs();
  }

  public onClick(public_key:string, private_key:string, iv:string, title: string){
    const formattedTitle = title.replace(/\D/g, '')
    const data: Keys = {key_size: parseInt(formattedTitle), public_key, private_key, iv};
    this.onEncryptData.emit(data);
    this.messageService.add({
      severity: 'info',
      summary: 'Copiado',
      detail: 'Se han copiado las claves',
    });
  }

}
