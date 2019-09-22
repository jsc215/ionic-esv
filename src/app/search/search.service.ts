import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  baseUrl = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  search(text): Observable<any> {
    let params = new HttpParams();
    Object.keys(text).forEach((key) => {
      params = params.append(key, text[key]);
      // params = params.set('q', text.verse, '');
    });
    console.log(params);
    return this.http.get(`${environment.BASE_URL}/query`, { params });
  }
}

// this.http.get('http://localhost:3000/api/query?q=john 3:15').subscribe((data) => console.log(data));
