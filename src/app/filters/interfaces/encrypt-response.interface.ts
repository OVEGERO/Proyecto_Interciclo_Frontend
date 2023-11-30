export interface EncryptResponse {

  encrypted_text: string;
  public_key: string;
  private_key?: string;
  iv?: string;

}
