export interface Amiibo {
  id: number;
  type: string;
  name: string;
  age: number;

  deleted?: boolean;
  photo?: string;
  inMemory?: boolean;
}
