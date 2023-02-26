export interface ApiOptions {
  endpoint: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: any;
}
