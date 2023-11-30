import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environment.prod';
import { DecryptRequest, DecryptResponse, EncryptRequest, EncryptResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CriptographyService {
  private baseUrlEncrypt: string = environments.baseUrlEncrypt;
  private baseUrlDecrypt: string = environments.baseUrlDecrypt;

  constructor(private httpClient: HttpClient) {}

  public encrypt(data: EncryptRequest): Observable<EncryptResponse> {
    const formData: FormData = new FormData();
    const key_size = data.key_size ? data.key_size.toString() : '';
    const public_key = data.public_key ? data.public_key : '';
    const iv = data.iv ? data.iv : '';
    formData.append('text', data.text);
    formData.append('key_size', key_size);
    formData.append('public_key', public_key);
    formData.append('mode', data.mode);
    formData.append('encrypt_type', data.encrypt_type);
    formData.append('iv', iv);

    return this.httpClient.post<EncryptResponse>(`${this.baseUrlEncrypt}`, formData);
  }

  public decrypt(data: DecryptRequest): Observable<DecryptResponse> {
    const formData: FormData = new FormData();
    const private_key = data.private_key ? data.private_key : '';
    const iv = data.iv ? data.iv : '';
    formData.append('text', data.text);
    formData.append('private_key', private_key);
    formData.append('public_key', data.public_key);
    formData.append('mode', data.mode);
    formData.append('encrypt_type', data.encrypt_type);
    formData.append('iv', iv);

    return this.httpClient.post<DecryptResponse>(`${this.baseUrlDecrypt}`, formData);
  }

}
