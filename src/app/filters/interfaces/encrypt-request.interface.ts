export interface EncryptRequest {

  text: string;
  key_size?: number;
  public_key?: string;
  mode: string;
  encrypt_type: string;
  iv?: string;

}
