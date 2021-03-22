import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinnStoreService {

  public saveOnLocaStorage(value: any, key: string): boolean {
    try{
      localStorage.setItem(key, value);
      return true;
    }catch (error){
      return false;
    }
  }

  public recoverFromLocalStorage(key: string): string{
    const value = localStorage.getItem(key);
    if (value === undefined){
      throw new Error('No local storage');
    } else {
      return value;
    }
  }

  public removeFromLocaStorage(key): boolean{
    try{
      localStorage.removeItem(key);
      return true;
    }catch (error){
      throw new Error('No local storage');
    }
  }

  public saveOnSessionStorage(value: any, key: string): boolean{
    try{
      sessionStorage.setItem(key, btoa(value));
      return true;
    }catch (error){
      throw new Error('No session storage');
    }
  }

  public recoverFromSessionStorage(key: string): string{
    const value = sessionStorage.getItem(key);
    if (value === undefined){
      throw new Error('No session storage');
    } else {
      return value === null ? null : atob(value);
    }
  }

  public removeFromSessionStorage(key): boolean{
    try{
      sessionStorage.removeItem(key);
      return true;
    }catch (error){
      throw new Error('No session storage');
    }
  }

}
