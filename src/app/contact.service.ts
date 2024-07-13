import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contact } from './contact/contact';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  url: string = environment.apiBaseUrl;

  constructor(
    private http: HttpClient
  ) { }

  save(contact: Contact) : Observable<Contact>{
    return this.http.post<Contact>(this.url, contact);
  }

  list() : Observable<Contact[]>{
    return this.http.get<any>(this.url);
  }

  favorite(contact: Contact) : Observable<any> {
    return this.http.patch(`${this.url}/${contact.id}/favorite`, null);
  }
}
