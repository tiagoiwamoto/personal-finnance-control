export class AppMessages {
  key?: string;
  value?: string;
  type?: string;
  page?: string;
  
  constructor(key: string, value: string, type: string, page: string) {
    this.key = key;
    this.value = value;
    this.type = type;
    this.page = page;
  }
}
