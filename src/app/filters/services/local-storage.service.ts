import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { EncryptResponse } from "../interfaces";


@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  private initialMap = new Map<string, EncryptResponse>();

  private datosSubject = new BehaviorSubject<Map<string, EncryptResponse>>(this.initialMap);

  setLocalStorage(data: EncryptResponse, encryption_type: string, key_size: number){
    localStorage.setItem(`${encryption_type} - ${key_size}`, JSON.stringify(data));
    this.getLocalStorage(encryption_type);
  }

  getLocalStorage(encryption_type: string){
    const datos = new Map<string, EncryptResponse>();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.includes(encryption_type)) {
        const value = localStorage.getItem(key);
        if (value) {
          datos.set(key, JSON.parse(value));
        }
      }
    }
    this.datosSubject.next(datos);
    return this.datosSubject.asObservable();
  }

  deleteFromLocalStorage(key: string, encryption_type: string){
    localStorage.removeItem(key);
    this.getLocalStorage(encryption_type);
  }

}

