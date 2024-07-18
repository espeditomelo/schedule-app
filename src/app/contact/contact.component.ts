import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { ContactService } from '../contact.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { DetailContactComponent } from '../detail-contact/detail-contact.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

   contactForm: FormGroup;
   contacts: Contact[] = [];
   columns = ['photo', 'id','name','email','favorite'];

   totalElements = 0;
   page = 0;
   size = 10;
   pageSizeOptions : number[] = [10];

  constructor(
    private service: ContactService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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

  listContacts(page = 0, size = 10){
    this.service.list(page, size)
      .subscribe(response => {
        this.contacts = response.content;
        this.totalElements = response.totalElements;
        this.page = response.number;
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
        this.listContacts();
        this.snackBar.open('Contact added', 'Success', {duration: 2000});
      })
      this.contactForm.reset();
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

  contactView(contact: Contact){
    this.dialog.open(DetailContactComponent, {
      width: '400px',
      height: '450px',
      data: contact
    });
  }

  toPage(event: PageEvent){
    this.page = event.pageIndex;
    this.listContacts(this.page, this.size);
  }

}
