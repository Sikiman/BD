import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { config } from 'src/app/config';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
};

  constructor(private http: HttpClient) { }

  getItemsById(id: String): Observable<Array<Item>> {
    return this.http.get<Array<Item>>(`${config.apiUrl}/items/type?id=${id}`);
  }

  saveItem(item: Item): Observable<Item>{
    console.log("post");
    return this.http.post<Item>(`${config.apiUrl}/item/save`, item, this.options)
    .pipe();
  }

  getItemById(id: String): Observable<Item> {
    return this.http.get<Item>(`${config.apiUrl}/item?id=${id}`);
  }
}
