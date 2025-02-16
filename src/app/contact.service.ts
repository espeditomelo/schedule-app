import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contact } from './contact/contact';
import { environment } from '../environments/environment';
import { ContactPage } from './contact/contactPage';

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

  list(page, size) : Observable<ContactPage>{
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.http.get<any>(`${this.url}?${params.toString()}` );
  }

  favorite(contact: Contact) : Observable<any> {
    return this.http.patch(`${this.url}/${contact.id}/favorite`, null);
  }

  upload(contact: Contact, formData: FormData) : Observable<any> {
    return this.http.put(`${this.url}/${contact.id}/photo`, formData, { responseType: 'blob' });
  }
}
