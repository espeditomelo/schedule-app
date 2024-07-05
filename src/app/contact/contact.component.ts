import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
    private service: ContactService
  ) { }

  ngOnInit(): void {

    const contact: Contact = new Contact();
    contact.name = 'Charlles';
    contact.email = 'char@email.com';
    contact.favorite = false;

    this.service.save(contact)
      .subscribe(response => {
        console.log(response);
      })

  }

}
