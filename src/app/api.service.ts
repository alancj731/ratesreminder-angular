import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../auth_config.json';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  ping$() {
    return this.http.get(`${config.apiUri}/api/external`);
  }

  getExchangeRates$() {
    const apiKey =process.env.API_KEY.replace(/['"]+/g, '');
    console.log("apiKey: ", apiKey);
    const url = 
    "https://api.currencybeacon.com/v1/currencies?api_key="+apiKey+"&type=fiat";
    console.log("url: ", url);
    return this.http.get(url);
  }

  putReminder$(url: string, body: any) {
    return this.http.put(url, body, { observe: 'response' });
  }
}
