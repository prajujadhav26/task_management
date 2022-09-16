import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseUrl = "http://localhost:8081/";

  constructor(private http:HttpClient) { }

  post(path: string, data: any) {
    const headers = { 'Content-type': 'application/json' };
    const body = JSON.stringify(data);
    return this.http.post(this.baseUrl +path, body, { 'headers': headers });
  }

}
