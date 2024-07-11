import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { ContactService } from '../contact.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

   contactForm: FormGroup;
   contacts: Contact[] = [];

  constructor(
    private service: ContactService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email]
    })
  }

  submit(){
    const formValues = this.contactForm.value;
    const contact: Contact = new Contact(formValues.name, formValues.email);
    this.service.save(contact)
      .subscribe(response => {
        this.contacts.push(response);
        console.log(this.contacts);
      })
  }
}
