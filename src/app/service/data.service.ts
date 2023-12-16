import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProductData} from '../interface/product-data'
@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataUrl:string = '/assets/data/data.json'; // Path to your JSON file
  constructor(private _HttpClient:HttpClient) {
  }
  getAllData(): Observable<any>{
   return this._HttpClient.get(this.dataUrl);
  }
}
