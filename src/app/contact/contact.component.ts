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
   columns = ['photo', 'id','name','email','favorite'];

  constructor(
    private service: ContactService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.listContacts();
    this.mountForm();
  }

  mountForm(){
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email]
    })
  }

  listContacts(){
    this.service.list()
      .subscribe(response => {
        this.contacts = response;
      })
  }

  favoriteContact(contact: Contact){
    this.service.favorite(contact).subscribe(response => {
      contact.favorite = !contact.favorite;
    })
  }

  submit(){
    const formValues = this.contactForm.value;
    const contact: Contact = new Contact(formValues.name, formValues.email);
    this.service.save(contact)
      .subscribe(response => {
        let list: Contact[] = [...this.contacts, response];
        this.contacts = list;
      })
  }

  uploadPhoto(event, contact){
    const files = event.target.files;
    if(files){
      const photo = files[0];
      const formData = new FormData();
      formData.append("photo", photo);
      this.service
        .upload(contact, formData)
        .subscribe(response => {
          this.listContacts();
        });
    }
  }
}
