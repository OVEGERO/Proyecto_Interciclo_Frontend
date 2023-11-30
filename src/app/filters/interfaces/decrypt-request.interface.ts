export interface DecryptRequest {

  text: string;
  private_key?: string;
  public_key: string;
  mode: string;
  encrypt_type: string;
  iv?: string;

}
