import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpActionEnum} from './view-model/HttpActionEnum';
import {AppMessages} from './view-model/app-messages';
import {FinnStoreService} from './finn-store.service';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FinnCoreService {

  appMessages: AppMessages[];
  appMessage: AppMessages;
  appHeaders: HttpHeaders;

  constructor(protected http: HttpClient, protected finnStore: FinnStoreService) { }

  protected async call(url: string, oldBody: any, body: any, action: HttpActionEnum, customHeaders: Map<string, string>): Promise<any> {
    /* Valida se a ação não está nula */
    if (action === null) {
      throw new Error(this.getMessage(environment.serviceError.noAction, 'finn-core'));
    }

    /* Monta o header padrão */
    this.appHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('x-token', '');
    if (customHeaders != null){
      customHeaders.forEach((value: string, key: string) => {
        this.appHeaders = this.appHeaders.append(key, value);
      });
    }

    /* Realiza a chamada */
    switch (action){
      case HttpActionEnum.GET:
        return this.http.get(url, {headers: this.appHeaders}).toPromise();
      case HttpActionEnum.POST:
        return this.http.post(url, JSON.stringify(body), {headers: this.appHeaders}).toPromise();
      case HttpActionEnum.PUT:
        return this.http.put(url, JSON.stringify(body), {headers: this.appHeaders}).toPromise();
      case HttpActionEnum.DELETE:
        return this.http.delete(url, {headers: this.appHeaders}).toPromise();
    }
  }

  protected getMessage(key: string, page: string): string{
    this.appMessages = JSON.parse(this.finnStore.recoverFromSessionStorage(key));
    this.appMessage = this.appMessages.filter(msg => msg.key === key && msg.page === page)[environment.zeroValue];
    return this.appMessage.value;
  }
}
